class TagsController < ApplicationController
  def index
    task = Task.find(params[:task_id])

    @tags = Tag.where(workspace_id: task.workspace_id)
               .where.not(id: task.tags.select(:id))

    @task_tags = task.tags
  end

  def create
    @tag = Tag.create!(tag_params)
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

  def tag_params
    params.permit(:name, :color, :workspace_id)
  end
end
