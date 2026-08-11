# == Schema Information
#
# Table name: users_workspaces
#
#  user_id      :uuid             not null
#  workspace_id :uuid             not null
#
# Indexes
#
#  index_users_workspaces_on_user_id_and_workspace_id  (user_id,workspace_id)
#  index_users_workspaces_on_workspace_id_and_user_id  (workspace_id,user_id)
#
# Foreign Keys
#
#  fk_rails_...  (user_id => users.id) ON DELETE => cascade
#  fk_rails_...  (workspace_id => workspaces.id) ON DELETE => cascade
#



class UsersWorkspaces < ApplicationRecord
  belongs_to :user
  belongs_to :workspace

  validates :user_id, uniqueness: { scope: :workspace_id }
end
