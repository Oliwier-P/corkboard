json.extract! task, :id, :name, :status, :priority, :order
json.tags task.tags do |tag|
  json.partial! "tags/tag", tag: tag
end
