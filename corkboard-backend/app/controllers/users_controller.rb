class UsersController < ApplicationController
  before_action :authenticate_user!

  def me
    @user = current_user
  end

  def update
    @user = current_user
    @user.update(user_params)
    render json: @user
  end

  private

  def user_params
    params.require(:user).permit(:username)
  end
end
