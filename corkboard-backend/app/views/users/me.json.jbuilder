json.extract! @user, :id, :username, :role
json.preferences do
  json.task_display @user.user_preference&.task_display
end