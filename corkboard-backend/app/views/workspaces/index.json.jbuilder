json.array!(@workspaces) do |workspace|
  json.extract! workspace, :id, :name, :current
end