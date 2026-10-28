json.message "Successfully leaved workspace"
json.workspace do
  json.partial! "workspaces/workspace", workspace: @workspace
end
