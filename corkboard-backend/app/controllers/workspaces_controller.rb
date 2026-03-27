class WorkspacesController < ApplicationController
  def index
    @workspaces = Workspace.all
  end

  def show
    @workspace = Workspace.find(params[:id])
  end

  def destroy
    workspace = Workspace.find(params[:id])

    unless workspace.owner_id == current_user.id
      return render json: { error: "Not authorized" }, status: :forbidden
    end

    workspace.destroy
  end

  def create
    Workspace.create(name: params[:name], owner_id: current_user.id)
  end

  def collaborators
    @users = Workspace.find(params[:id]).users
    invited_user_ids = WorkspaceInvitation.where(workspace_id: params[:id]).pluck(:invited_user_id)
    @invited_users = User.where(id: invited_user_ids)
  end

  def invite_user
    @user = User.find_by(username: params[:username])

    return render json: {error: "Username not found!"} if @user.nil?

    WorkspaceInvitation.create!(invited_user_id: @user&.id, workspace_id: params[:id], invited_by_user_id: current_user.id)
  end

  def invitation
    @invitation = WorkspaceInvitation.where(invited_user_id: current_user.id)
  end

  def current_release
    @current_release = Workspace.find(params[:id]).releases.find_by(current: true)
  end

  def releases
    workspace = Workspace.find(params[:id])
    @releases = workspace.releases&.order("releases.order ASC") || []
    @current_release = @releases.find_by(current: true)
  end
end
