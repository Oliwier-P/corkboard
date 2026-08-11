# == Schema Information
#
# Table name: workspace_invitations
#
#  id                 :uuid             not null, primary key
#  status             :string
#  created_at         :datetime         not null
#  updated_at         :datetime         not null
#  invited_by_user_id :uuid
#  invited_user_id    :uuid
#  workspace_id       :uuid             not null
#
# Foreign Keys
#
#  fk_rails_...  (invited_by_user_id => users.id) ON DELETE => cascade
#  fk_rails_...  (invited_user_id => users.id) ON DELETE => cascade
#  fk_rails_...  (workspace_id => workspaces.id)
#



class WorkspaceInvitation < ApplicationRecord
  belongs_to :workspace
  belongs_to :user, foreign_key: :invited_by_user_id
end
