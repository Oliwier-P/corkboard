require "test_helper"

# == Schema Information
#
# Table name: tags
#
#  id           :uuid             not null, primary key
#  color        :string           not null
#  name         :string           not null
#  created_at   :datetime         not null
#  updated_at   :datetime         not null
#  workspace_id :uuid             not null
#
# Indexes
#
#  index_tags_on_workspace_id           (workspace_id)
#  index_tags_on_workspace_id_and_name  (workspace_id,name)
#
# Foreign Keys
#
#  fk_rails_...  (workspace_id => workspaces.id)
#
class TagTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
