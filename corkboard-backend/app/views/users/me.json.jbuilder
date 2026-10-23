json.user do
  json.partial! "users/user", user: @user
end
json.workspace do
  json.partial! "workspaces/workspace", workspace: @workspace
end
if @release.present?
  json.release do
    json.partial! "releases/release", release: @release
  end
end
