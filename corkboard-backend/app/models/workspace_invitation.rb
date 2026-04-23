class WorkspaceInvitation < ApplicationRecord
  belongs_to :workspace
  belongs_to :user, foreign_key: :invited_by_user_id
end