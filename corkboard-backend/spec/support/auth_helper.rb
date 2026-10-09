module AuthHelper
  def auth_headers(user)
    token = Warden::JWTAuth::UserEncoder.new.call(user, :user, nil).first
    { "Authorization" => "Bearer #{token}" }
  end

  def check_permission(verb, path, user, params = nil)
    options = { headers: auth_headers(user) }
    options[:params] = params if params

    public_send(verb, path, **options)

    expect(response).to have_http_status(:forbidden)
  end

  def check_authentication(verb, path, params = nil, headers: {})
    options = { headers: headers }
    options[:params] = params if params

    public_send(verb, path, **options)

    expect(response).to have_http_status(:unauthorized)
  end
end

RSpec.configure do |config|
  config.include AuthHelper, type: :request
end