class DocumentsChannel < ApplicationCable::Channel
  def subscribed
    stream_from "documents_#{params[:workspace_id]}"
  end
end