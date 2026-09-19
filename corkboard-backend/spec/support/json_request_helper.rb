module JsonRequestHelper
  %i[get post patch put delete].each do |verb|
    define_method(verb) do |path, **options|
      options[:as] ||= :json
      super(path, **options)
    end
  end
end

RSpec.configure do |config|
  config.include JsonRequestHelper, type: :request
end