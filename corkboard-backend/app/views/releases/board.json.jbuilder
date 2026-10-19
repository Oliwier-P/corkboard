Task.statuses.keys.excluding("backlog").each do |status|
  json.set! status do
    json.array! @tasks.fetch(status, []) do |task|
      json.extract! task, :id, :name, :status, :priority, :code_name, :order

      json.tags task.tags do |tag|
        json.partial! "tags/tag", tag: tag
      end

      json.user task.user ? { id: task.user.id, username: task.user.username } : nil
    end
  end
end
