json.backlog_tasks do
  json.array! @backlog_tasks, partial: "tasks/task", as: :task
end
json.release_tasks do
  Task.statuses.keys.excluding("backlog").each do |status|
    json.set! status do
      json.array! @release_tasks.fetch(status, []), partial: "tasks/task", as: :task
    end
  end
end
json.release_name @workspace.current_release&.name
