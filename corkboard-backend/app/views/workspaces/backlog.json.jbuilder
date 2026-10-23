json.taskIds @tasks.order("tasks.position ASC").map { |task| task.id }

json.tasks do
  @tasks.each do |task|
    json.set! task.id do
      json.partial! "tasks/task", task: task

      json.user do
        if task.user
          json.extract! task.user, :id, :username
        else
          json.nil!
        end
      end
    end
  end
end
