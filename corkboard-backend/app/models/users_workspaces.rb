# == Schema Information
#
# Table name: users_workspaces
#
#  workspace_id :integer          not null
#  user_id      :integer          not null
#
# Indexes
#
#  index_users_workspaces_on_user_id_and_workspace_id  (user_id,workspace_id)
#  index_users_workspaces_on_workspace_id_and_user_id  (workspace_id,user_id)
#

class UsersWorkspaces < ApplicationRecord
end
