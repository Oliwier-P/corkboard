class BacklogController < ApplicationController
  before_action :authenticate_user!

  def show
    workspace = Workspace.find(params[:id])
    authorize! :read, workspace
    @tasks = Task.where(workspace_id: workspace.id, status: Task.statuses[:backlog], release_id: nil)
  end
end
