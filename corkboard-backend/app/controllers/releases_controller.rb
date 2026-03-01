class ReleasesController < ApplicationController
  def index
    @releases = Workspace.find_by(owner_id: current_user.id)&.releases || []

    render json: @releases
  end

  def current
    @current_release = Workspace.find_by(owner_id: current_user.id).releases.find_by(current: true)

    render json: @current_release
  end
end
