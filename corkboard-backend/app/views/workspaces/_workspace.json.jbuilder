json.extract! workspace, :id, :name, :owner_id, :code_prefix, :code_prefix_enabled
json.owner do
  json.extract! workspace.owner, :id, :username
end
json.number_of_members workspace.users.count
