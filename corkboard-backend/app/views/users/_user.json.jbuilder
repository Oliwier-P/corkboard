json.extract! user, :id, :username, :role, :created_at, :updated_at
json.preferences do
  json.task_display user.user_preference&.task_display
  json.show_board_tags user.user_preference&.show_board_tags
end
