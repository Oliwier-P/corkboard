class WorkspaceChannel < ApplicationCable::Channel
  def subscribed
    stream_from "workspace_#{params[:workspace_id]}"
  end
end
