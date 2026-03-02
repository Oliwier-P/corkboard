class TasksController < ApplicationController

  def index
    if params[:release_id]
      @tasks = Release.find(params[:release_id]).tasks
    else
      render json: {}, status: :bad_request
    end

    @tasks
  end

  def create
    release = Release.find(tasks_params[:release_id])

    if release
      task = Task.create!(tasks_params)
      render json: {id: task.id}, status: :created
    end
  end

  def update
    task = Task.find(params[:id])
    order = tasks_params[:order]
    task.release.tasks.where(status: task.status, order: tasks_params[:order]...).where.not(id: params[:id]).each do |t|
      order = order + 1
      t.update_column(:order, order)
    end

    task.update!(tasks_params)
    render json: {}, status: :created
  end

  def tasks_params
    params.require(:task).permit(:name, :description, :release_id, :status, :order)
  end
end
