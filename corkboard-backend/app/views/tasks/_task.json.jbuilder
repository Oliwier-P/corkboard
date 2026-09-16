json.extract! task, :id, :name, :status, :priority, :order, :code_name
json.tags task.tags do |tag|
  json.partial! "tags/tag", tag: tag
end
