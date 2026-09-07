json.taskIds @tasks.order("tasks.order ASC").map { |task| task.id }

json.tasks do
  @tasks.each do |task|
    json.set! task.id do
      json.extract! task, :id, :name, :status, :priority
      json.tags task.tags do |tag|
        json.partial! "tags/tag", tag: tag
      end

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