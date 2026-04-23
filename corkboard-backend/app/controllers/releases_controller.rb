class ReleasesController < ApplicationController
  before_action :set_release, only: [:board]

  def create
    workspace = current_user.workspaces.find_by(id: params[:workspace_id])
    if workspace
      releases_count = workspace.releases.count
      current_release = workspace.releases.find_by(current: true)

      @release = Release.create!(
        release_params.merge(order: releases_count + 1, current: !current_release, workspace_id: workspace.id)
      )
    end
  end

  def update
    workspace = Workspace.find_by(owner_id: current_user.id)
    release = workspace&.releases&.find(params[:id])

    release&.update(release_params)
  end

  def destroy
    workspace = Workspace.find_by(owner_id: current_user.id)
    release = workspace&.releases&.find_by(id: params[:id])

    release&.destroy!
  end

  def board
    @tasks = @release.tasks
  end

  private

  def release_params
    params.permit(:name, :workspace_id)
  end

  def set_release
    @release = Release.joins(:workspace).where(workspace_id: current_user.workspaces.map{|w| w.id}).find_by(id: params[:id])
  end
end
