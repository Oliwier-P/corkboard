class ReleasesController < ApplicationController
  before_action :set_release, only: [:board]

  def create
    workspace = current_user.workspaces.find_by(id: params[:workspace_id])
    if workspace
      releases_count = workspace.releases.where(completed: false).count
      current_release = workspace.releases.find_by(current: true)

      @release = Release.create!(
        release_params.merge(order: releases_count, current: !current_release, workspace_id: workspace.id)
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
  end

  private

  def release_params
    params.permit(:name, :workspace_id, :status, :order)
  end

  def set_release
    @release = Release.joins(:workspace).where(workspace_id: current_user.workspaces.map{|w| w.id}).find_by(id: params[:id])
  end
end
