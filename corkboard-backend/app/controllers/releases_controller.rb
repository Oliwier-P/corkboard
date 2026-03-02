class ReleasesController < ApplicationController
  def index
    @releases = Workspace.find_by(owner_id: current_user.id)&.releases || []
  end

  def create
    workspace = Workspace.find_by(owner_id: current_user.id)
    workspace.releases.create!(
      release_params.merge(order: 1, current: false)
    )
  end

  def update
    workspace = Workspace.find_by(owner_id: current_user.id)
    release = workspace.releases.find(params[:id])

    release.update(release_params)
  end

  def destroy
    workspace = Workspace.find_by(owner_id: current_user.id)
    release = workspace.releases.find_by(id: params[:id])

    release.destroy
  end

  private def release_params
    params.permit(:name)
  end

  def current
    @current_release = Workspace.find_by(owner_id: current_user.id).releases.find_by(current: true)
  end
end
