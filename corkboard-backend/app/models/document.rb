# == Schema Information
#
# Table name: documents
#
#  id           :bigint           not null, primary key
#  content      :jsonb
#  name         :string
#  yjs_state    :binary
#  created_at   :datetime         not null
#  updated_at   :datetime         not null
#  owner_id     :bigint           not null
#  task_id      :bigint
#  workspace_id :bigint           not null
#
# Indexes
#
#  index_documents_on_owner_id      (owner_id)
#  index_documents_on_task_id       (task_id)
#  index_documents_on_workspace_id  (workspace_id)
#
# Foreign Keys
#
#  fk_rails_...  (owner_id => users.id)
#  fk_rails_...  (task_id => tasks.id)
#  fk_rails_...  (workspace_id => workspaces.id)
#


class Document < ApplicationRecord
  belongs_to :owner, class_name: "User"
  belongs_to :task

  def broadcast(type, current_user)
    ActionCable.server.broadcast "documents_#{self.workspace_id}", {
      type: type,
      document: {
        id: self.id,
        name: self.name,
        updated_at: self.updated_at,
        owner: {
          id: self.owner.id,
          username: self.owner.username
        },
        actor_id: current_user&.id
      }
    }
  end
end
