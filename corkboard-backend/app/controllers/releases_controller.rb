class ReleasesController < ApplicationController
  before_action :set_release, only: [:board]

  def create
    workspace = Workspace.find_by(owner_id: current_user.id, id: params[:workspace_id])
    if workspace
      releases_count = workspace.releases.count
      current_release = workspace.releases.find_by(current: true)

      @release = workspace.releases.create!(
        release_params.merge(order: releases_count + 1, current: !current_release)
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
    @release = Release.joins(:workspace).where(workspaces: { owner_id: current_user.id }).find_by(id: params[:id])
  end
end
