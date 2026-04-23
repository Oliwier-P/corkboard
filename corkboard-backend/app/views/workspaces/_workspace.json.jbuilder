json.extract! workspace, :id, :name, :owner_id
json.owner do
  json.extract! workspace.owner, :id, :username
end
