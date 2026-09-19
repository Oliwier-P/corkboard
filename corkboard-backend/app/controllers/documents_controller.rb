class DocumentsController < ApplicationController
  load_and_authorize_resource except: [:ydoc, :update_ydoc, :show]

  def index
    @documents = Document.not_task_documents.where(workspace_id: params[:workspace_id])
  end

  def show
    @document = Document.find_by!(task_id: params[:task_id])
  end

  def create
    @document = Document.create!(name: "Untilted", owner_id: current_user.id, workspace_id: params[:workspace_id])
    @document.broadcast("document_created", current_user)
  end

  def ydoc
    verify_internal_token!
    return if performed?

    document = Document.find(params[:id])

    if document.yjs_state.present?
      send_data document.yjs_state, type: "application/octet-stream"
    else
      head :no_content
    end
  end

  def update_ydoc
    verify_internal_token!
    return if performed?

    request.body.rewind
    body = request.body.read&.force_encoding("BINARY")

    document = Document.find(params[:id])
    document.update!(yjs_state: body)
    head :ok
  end

  def update
    @document = Document.find(params[:id])
    @document.update(document_params)
    @document.broadcast("document_updated", current_user)
    render json: { message: "Successfully updated!" }
  end

  def destroy
    @document = Document.find(params[:id])
    @document.broadcast("document_destroyed", current_user)
    @document.destroy

    render json: { message: "Successfully deleted!" }
  end

  private

  def document_params
    params.permit(:name, content: {})
  end

  def verify_internal_token!
    unless request.headers['X-Internal-Token'] == Rails.configuration.hocuspocus_secret
      head :unauthorized
    end
  end
end
