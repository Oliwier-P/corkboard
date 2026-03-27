json.array! @invitation do |invitation|
  json.invited_by invitation.user.username
  json.workspace invitation.workspace.name
end