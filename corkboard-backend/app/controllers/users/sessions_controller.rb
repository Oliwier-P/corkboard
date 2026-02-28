class Users::SessionsController < Devise::SessionsController
  respond_to :json

  def create
    user = User.find_by(username: params[:user][:username])

    if user&.valid_password?(params[:user][:password])
      sign_in(user)
      token = request.env['warden-jwt_auth.token']

      render json: {
        status: 200,
        message: 'Logged in successfully',
        token: token,
        data: UserSerializer.new(user).serializable_hash[:data][:attributes]
      }
    else
      render json: { status: 401, message: 'Invalid username or password' }, status: :unauthorized
    end
  end

  private

  def set_flash_message(*args)

  end

  def respond_with(resource, _opt = {})
    @token = request.env['warden-jwt_auth.token']
    headers['Authorization'] = @token

    render json: {
      status: {
        code: 200, message: 'Logged in successfully.',
        token: @token,
        data: {
          user: UserSerializer.new(resource).serializable_hash[:data][:attributes]
        }
      }
    }, status: :ok
  end

  def respond_to_on_destroy
    if request.headers['Authorization'].present?
      jwt_payload = JWT.decode(request.headers['Authorization'].split.last,
                               Rails.application.credentials.devise_jwt_secret_key!).first

      current_user = User.find(jwt_payload['sub'])
    end

    if current_user
      render json: {
        status: 200,
        message: 'Logged out successfully.'
      }, status: :ok
    else
      render json: {
        status: 401,
        message: "Couldn't find an active session."
      }, status: :unauthorized
    end
  end
end