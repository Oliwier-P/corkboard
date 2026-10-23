class ReleaseChannel < ApplicationCable::Channel
  def subscribed
    stream_from "release_#{params[:release_id]}"
  end
end
