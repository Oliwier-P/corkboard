# == Schema Information
#
# Table name: workspace_invitations
#
#  id                 :integer          not null, primary key
#  workspace_id       :integer
#  invited_user_id    :integer
#  invited_by_user_id :integer
#  status             :string
#  created_at         :datetime         not null
#  updated_at         :datetime         not null
#

class WorkspaceInvitation < ApplicationRecord
  belongs_to :workspace
  belongs_to :user, foreign_key: :invited_by_user_id
end
