class WorkspacesController < ApplicationController
  def index
    @workspaces = Workspace.all
  end

  def create
    Workspace.create(name: params[:name], owner_id: current_user.id)
  end

  def switch
    Workspace.where(owner_id: current_user.id, current: true).update_all(current: false)
    Workspace.where(owner_id: current_user.id, id: params[:id]).update(current: true)
  end
end
