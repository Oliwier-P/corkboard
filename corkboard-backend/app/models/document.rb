# == Schema Information
#
# Table name: documents
#
#  id           :integer          not null, primary key
#  name         :string
#  content      :jsonb
#  owner_id     :integer          not null
#  workspace_id :integer          not null
#  created_at   :datetime         not null
#  updated_at   :datetime         not null
#  yjs_state    :binary
#
# Indexes
#
#  index_documents_on_owner_id      (owner_id)
#  index_documents_on_workspace_id  (workspace_id)
#

class Document < ApplicationRecord
  belongs_to :owner, class_name: "User"

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
