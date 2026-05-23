class DocumentsController < ApplicationController

  def index
    @documents = Document.all
  end

  def create
    @document = Document.create(name: "Untilted", owner_id: current_user.id, workspace_id: params[:workspace_id])
  end

  def update
    @document = Document.find(params[:id])
    @document.update(document_params)

    render json: {message: "Successfully updated!"}
  end

  def destroy
    @document = Document.find(params[:id])
    @document.destroy

    render json: {message: "Successfully deleted!"}
  end

  private

  def document_params
    params.permit(:name, content: {})
  end
end
