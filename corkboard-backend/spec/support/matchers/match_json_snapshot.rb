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

    expected = JSON.parse(File.read(path))
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

  def mask_any(expected, actual)
    return "ANY" if expected == "ANY"

    if expected.is_a?(Hash) && actual.is_a?(Hash)
      actual.to_h { |k, v| [k, expected.key?(k) ? mask_any(expected[k], v) : v] }
    elsif expected.is_a?(Array) && actual.is_a?(Array)
      actual.each_with_index.map { |a, i| i < expected.size ? mask_any(expected[i], a) : a }
    else
      actual
    end
  end

  failure_message do
    "expected:\n#{JSON.pretty_generate(@diff_expected)}\n\n" \
      "got:\n#{JSON.pretty_generate(mask_any(@diff_expected, @diff_actual))}"
  end
end