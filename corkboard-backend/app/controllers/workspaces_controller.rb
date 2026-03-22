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
