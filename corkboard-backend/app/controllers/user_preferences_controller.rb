class UserPreferencesController < ApplicationController
  load_and_authorize_resource

  def update
    @user = current_user

    if @user.user_preference.update(user_preference_params)
      render template: 'users/me'
    else
      render json: { errors: @user.user_preference.errors }, status: :unprocessable_entity
    end
  end

  private

  def user_preference_params
    params.require(:user_preference).permit(:task_display, :show_board_tags, :spellcheck)
  end
end
