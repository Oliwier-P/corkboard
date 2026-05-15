class WorkspacesController < ApplicationController
  def index
    @workspaces = current_user.workspaces
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

  def update
    @workspace = current_user.workspaces.find(params[:id])
    @workspace&.update!(workspace_params)
  end

  def collaborators
    @users = Workspace.find(params[:id]).users
    invited_user_ids = WorkspaceInvitation.where(workspace_id: params[:id]).pluck(:invited_user_id)
    @invited_users = User.where(id: invited_user_ids)
  end

  def invite_user
    @user = User.find_by(username: params[:username])
    return render json: { error: "Username not found!" } if @user.nil?

    already_in_workspace = UsersWorkspaces.find_by(workspace_id: params[:id], user_id: @user.id)
    return render json: { message: "Username already in workspace!" } if already_in_workspace

    already_invited = WorkspaceInvitation.find_by(invited_user_id: @user.id, workspace_id: params[:id])
    return render json: { message: "Username already invited!" } if already_invited

    WorkspaceInvitation.create!(invited_user_id: @user&.id, workspace_id: params[:id], invited_by_user_id: current_user.id)
  end

  def invitation
    @invitation = WorkspaceInvitation.where(invited_user_id: current_user.id)
  end

  def accept_invitation
    invitation = WorkspaceInvitation.find_by(invited_user_id: current_user.id, workspace_id: params[:id])
    invitation.destroy! if invitation
    UsersWorkspaces.create!(workspace_id: params[:id], user_id: current_user.id)
  end

  def decline_invitation
    WorkspaceInvitation.where(invited_user_id: current_user.id, workspace_id: params[:id]).delete_all
  end

  def current_release
    @current_release = Workspace.find(params[:id]).releases.find_by(current: true)

    render json: nil if @current_release.nil?
  end

  def complete_release
    current_release = Workspace.find(params[:id]).current_release
    current_release&.update!(completed: true, current: false)

    @release = Release.where(workspace_id: params[:id]).where('"order" > ?', @release&.order).order(:order).first
    @release.update!(current: true)
  end

  def releases
    workspace = Workspace.find(params[:id])
    @releases = workspace.releases&.order("releases.order ASC") || []
    @current_release = @releases.find_by(current: true)
  end

  private

  def workspace_params
    params.require(:workspace).permit(:name)
  end
end
