json.extract! document, :id, :name, :content, :workspace_id, :created_at, :updated_at

json.owner do
  json.extract! document.owner, :id, :username
end