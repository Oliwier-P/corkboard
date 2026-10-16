class UserPreferencesController < ApplicationController
  before_action :authenticate_user!
  load_and_authorize_resource

  def update
    @user = current_user

    if @user.user_preference.update(user_preference_params)
      render template: "users/me"
    else
      render json: { errors: @user.user_preference.errors }, status: :unprocessable_entity
    end
  end

  private

  ALLOWED_PARAMS = [:task_display, :show_board_tags, :spellcheck]

  def user_preference_params
    params.permit(ALLOWED_PARAMS)
  end
end
