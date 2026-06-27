# == Schema Information
#
# Table name: workspace_invitations
#
#  id                 :bigint           not null, primary key
#  status             :string
#  created_at         :datetime         not null
#  updated_at         :datetime         not null
#  invited_by_user_id :integer
#  invited_user_id    :integer
#  workspace_id       :integer
#



class WorkspaceInvitation < ApplicationRecord
  belongs_to :workspace
  belongs_to :user, foreign_key: :invited_by_user_id
end
