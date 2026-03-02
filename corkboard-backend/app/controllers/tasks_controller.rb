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
      Task.create!(tasks_params)
      render json: {}, status: :created
    end
  end

  def tasks_params
    params.require(:task).permit(:name, :description, :release_id, :status)
  end
end
