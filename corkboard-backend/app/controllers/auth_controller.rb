class AuthController < ApplicationController
  def verify_token
    token = request.headers['Authorization']&.split(' ')&.last

    payload = JWT.decode(
      token,
      "JWT_SECRET",
      true,
      algorithms: ['HS256']
    ).first

    user = User.find(payload['sub'])
    render json: { user: { id: user.id, name: user.username } }

  rescue JWT::DecodeError, JWT::ExpiredSignature, ActiveRecord::RecordNotFound => e
    render json: { error: e.message }, status: :unauthorized
  end
end