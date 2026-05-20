class ReleasesController < ApplicationController
  before_action :set_release, only: [:board, :all_tasks]

  def create
    workspace = current_user.workspaces.find_by(id: params[:workspace_id])
    if workspace
      releases_count = workspace.releases.where(completed: false).count

      @release = Release.create!(
        release_params.merge(order: releases_count, workspace_id: workspace.id)
      )
    end
  end

  def update
    release = Release.find(params[:id])

    Releases::UpdateRelease.new(
      release: release,
      params: release_params,
    ).call
  end

  def destroy
    release = Release&.find_by(id: params[:id])
    release&.destroy!
  end

  def board
    @tasks = @release.tasks.includes(:user)
    @backlog_tasks = Task.where(workspace_id: @release.workspace_id, status: Task.statuses[:backlog], release_id: nil)
  end

  def all_tasks
    @tasks = @release.tasks
  end

  private

  def release_params
    params.permit(:name, :workspace_id, :status, :order)
  end

  def set_release
    @release = Release.joins(:workspace).where(workspace_id: current_user.workspaces.map{|w| w.id}).find_by(id: params[:id])
  end
end
