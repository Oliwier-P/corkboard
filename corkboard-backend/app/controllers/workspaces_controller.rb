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
end
