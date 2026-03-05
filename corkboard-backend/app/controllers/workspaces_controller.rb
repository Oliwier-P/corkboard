class WorkspacesController < ApplicationController
  def index
    @workspaces = Workspace.all
  end

  def create
    Workspace.create(name: params[:name], owner_id: current_user.id)
  end

  def switch
    Workspace.find_by(owner_id: current_user.id, current: true)&.update(current: false)
    Workspace.find_by(owner_id: current_user.id, id: params[:id])&.update(current: true)
  end
end
