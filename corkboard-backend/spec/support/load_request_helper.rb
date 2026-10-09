module LoadRequestHelper
  def load_request(name, overrides = {})
    spec_file = RSpec.current_example.metadata[:absolute_file_path] ||
                File.expand_path(RSpec.current_example.metadata[:file_path])
    path = File.join(File.dirname(spec_file), "requests", "#{name}.json")

    raise ArgumentError, "Request file not found: #{path}" unless File.exist?(path)

    JSON.parse(File.read(path)).deep_merge(overrides.deep_stringify_keys)
  end
end

RSpec.configure do |config|
  config.include LoadRequestHelper, type: :request
end