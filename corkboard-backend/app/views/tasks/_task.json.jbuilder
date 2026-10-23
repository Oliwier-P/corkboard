json.extract! task, :id, :name, :status, :priority, :position, :code_name
json.tags task.tags do |tag|
  json.partial! "tags/tag", tag: tag
end
