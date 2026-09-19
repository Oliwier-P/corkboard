RSpec::Matchers.define :match_json_snapshot do |snapshot_name|
  UUID_REGEX = /\A[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}\z/i
  TIMESTAMP_REGEX = /\A\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(\.\d+)?(Z|[+-]\d{2}:\d{2})?\z/

  match do |actual|
    actual = JSON.parse(actual) if actual.is_a?(String)

    spec_file = RSpec.current_example.metadata[:file_path]
    spec_dir = File.dirname(spec_file)
    path = Rails.root.join(spec_dir, "snapshots", "#{snapshot_name}.json")

    if ENV["UPDATE_SNAPSHOTS"] == "true" || !File.exist?(path)
      existed = File.exist?(path)
      FileUtils.mkdir_p(File.dirname(path))
      File.write(path, JSON.pretty_generate(auto_any(actual)))
      warn "Snapshot #{existed ? 'updated' : 'created'}: #{path}"
      next true
    end

    raw = File.read(path)
    expected = JSON.parse(raw)
    @snapshot_path = path
    @snapshot_lines = raw.lines
    @diff_expected = expected
    @diff_actual = actual
    json_match?(expected, actual)
  end

  def auto_any(value)
    case value
    when Hash
      value.transform_values { |v| auto_any(v) }
    when Array
      value.map { |v| auto_any(v) }
    when String
      (value.match?(UUID_REGEX) || value.match?(TIMESTAMP_REGEX)) ? "ANY" : value
    else
      value
    end
  end

  def json_match?(expected, actual)
    return true if expected == "ANY"

    if expected.is_a?(Hash) && actual.is_a?(Hash)
      return false unless expected.keys.sort == actual.keys.sort
      expected.all? { |k, v| json_match?(v, actual[k]) }
    elsif expected.is_a?(Array) && actual.is_a?(Array)
      expected.size == actual.size &&
        expected.zip(actual).all? { |e, a| json_match?(e, a) }
    else
      expected == actual
    end
  end

  def collect_diffs(expected, actual, path = "")
    diffs = []
    return diffs if expected == "ANY"

    if expected.is_a?(Hash) && actual.is_a?(Hash)
      all_keys = (expected.keys + actual.keys).uniq
      all_keys.each do |key|
        new_path = path.empty? ? key : "#{path}.#{key}"
        if !expected.key?(key)
          diffs << [new_path, "(missing key)", actual[key]]
        elsif !actual.key?(key)
          diffs << [new_path, expected[key], "(missing key)"]
        else
          diffs.concat(collect_diffs(expected[key], actual[key], new_path))
        end
      end
    elsif expected.is_a?(Array) && actual.is_a?(Array)
      if expected.size != actual.size
        diffs << ["#{path} (size)", expected.size, actual.size]
      else
        expected.each_with_index do |e, i|
          diffs.concat(collect_diffs(e, actual[i], "#{path}[#{i}]"))
        end
      end
    elsif expected != actual
      diffs << [path, expected, actual]
    end

    diffs
  end

  def find_line_number(path)
    return nil unless @snapshot_lines

    key = path.split(/\.|\[\d+\]\.?/).last
    return nil if key.nil? || key.empty?

    @search_cursor ||= 0
    pattern = /"#{Regexp.escape(key)}"\s*:/

    @snapshot_lines.each_with_index do |line, idx|
      next if idx < @search_cursor
      if line.match?(pattern)
        @search_cursor = idx + 1
        return idx + 1
      end
    end

    nil
  end

  failure_message do |actual|
    actual = JSON.parse(actual) if actual.is_a?(String)
    @search_cursor = 0
    diffs = collect_diffs(@diff_expected, @diff_actual)

    diff_lines = diffs.map do |path, exp, act|
      line_num = find_line_number(path)
      line_info = line_num ? "\n    line: #{line_num}" : ""
      "  #{path}:\n    expected: #{exp.inspect}\n    got:      #{act.inspect}#{line_info}"
    end.join("\n\n")

    spec_file = RSpec.current_example.metadata[:file_path]

    "Snapshot mismatch for #{snapshot_name} (#{@snapshot_path})\n\n" \
      "Differences:\n#{diff_lines}\n\n" \
      "If this change is intentional, run:\n" \
      "  UPDATE_SNAPSHOTS=true bundle exec rspec #{spec_file}"
  end
end