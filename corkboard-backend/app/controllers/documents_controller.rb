class DocumentsController < ApplicationController

  def index
    @documents = Document.all

    render json: @documents
  end

  def create
    @document = Document.create(name: "Untilted", owner_id: current_user.id, workspace_id: params[:workspace_id])

    render json: @document
  end

end
