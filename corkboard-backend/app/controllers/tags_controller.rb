class TagsController < ApplicationController
  before_action :authenticate_user!
  load_and_authorize_resource

  def index
    if params[:task_id].present?
      task = Task.find(params[:task_id])
      authorize! :read, Tag.new(workspace_id: params[:workspace_id])

      @tags = Tag.where(workspace_id: task.workspace_id)
                 .where.not(id: task.tags.select(:id))

      @task_tags = task.tags
    end

    if params[:workspace_id].present?
      authorize! :read, Tag.new(workspace_id: params[:workspace_id])
      @tags = Tag.where(workspace_id: params[:workspace_id])
    end
  end

  def update
    @tag = Tag.find(params[:id])
    @tag.update(tag_params)
  end

  def create
    @tag = Tag.create!(tag_params.to_h)
  end

  def destroy
    @tag = Tag.find(params[:id])
    @tag.destroy
  end

  def assign
    task = Task.find(params[:task_id])
    @tag = Tag.find(params[:id])

    @tasks_tag = TasksTag.create!(task: task, tag: @tag)
  end

  def unassign
    task = Task.find(params[:task_id])
    tasks_tag = task.tasks_tags.find_by!(tag_id: params[:id])

    tasks_tag.destroy!
    @tag = Tag.find(params[:id])
  end

  private

  ALLOWED_PARAMS = [:name, :color, :workspace_id]

  def tag_params
    params.require(:tag).permit(ALLOWED_PARAMS)
  end
end
