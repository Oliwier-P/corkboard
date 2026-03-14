class WorkspacesController < ApplicationController
  def index
    @workspaces = Workspace.all
  end

  def show
    @workspace = Workspace.find(params[:id])
  end

  def create
    Workspace.create(name: params[:name], owner_id: current_user.id)
  end
end
