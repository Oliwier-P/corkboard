include Devise::Controllers::Helpers

class ApplicationController < ActionController::API
  include ActionController::MimeResponds
  before_action :configure_permitted_parameters, if: :devise_controller?

  protected

  def configure_permitted_parameters
    devise_parameter_sanitizer.permit(:sign_up, keys: [:username, :email, :password, :password_confirmation])

    devise_parameter_sanitizer.permit(:account_update, keys: [:username, :email, :password, :password_confirmation])
  end

  rescue_from CanCan::AccessDenied do |e|
    if e.action == :destroy && e.subject.is_a?(Workspace) &&
       e.subject.owner_id == current_user.id
      render json: { message: "You can't delete your only workspace" }, status: :forbidden
    else
      render json: { message: "Not authorized" }, status: :forbidden
    end
  end
end
