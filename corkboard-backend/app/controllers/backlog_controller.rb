class BacklogController < ApplicationController
  def show
    @tasks = Task.where(workspace_id: params[:id], status: Task.statuses[:backlog], release_id: nil)
  end
end