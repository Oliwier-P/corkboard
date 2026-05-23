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
#
# Indexes
#
#  index_documents_on_owner_id      (owner_id)
#  index_documents_on_workspace_id  (workspace_id)
#

class Document < ApplicationRecord
  belongs_to :owner, class_name: "User"
end
