json.tags do
  json.array! @tags, partial: "tags/tag", as: :tag
end
json.task_tags do
  json.array! @task_tags, partial: "tags/tag", as: :tag
end
