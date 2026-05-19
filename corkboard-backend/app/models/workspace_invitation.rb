# == Schema Information
#
# Table name: workspace_invitations
#
#  id                 :integer          not null, primary key
#  created_at         :datetime         not null
#  invited_by_user_id :integer
#  invited_user_id    :integer
#  status             :string
#  updated_at         :datetime         not null
#  workspace_id       :integer
#


class WorkspaceInvitation < ApplicationRecord
  belongs_to :workspace
  belongs_to :user, foreign_key: :invited_by_user_id
end
