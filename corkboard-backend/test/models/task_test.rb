# == Schema Information
#
# Table name: tasks
#
#  id           :uuid             not null, primary key
#  code_name    :string
#  code_number  :integer
#  name         :string
#  order        :integer
#  priority     :string
#  status       :string
#  created_at   :datetime         not null
#  updated_at   :datetime         not null
#  release_id   :uuid
#  user_id      :uuid
#  workspace_id :uuid
#
# Indexes
#
#  index_tasks_on_workspace_id_and_code_name  (workspace_id,code_name) UNIQUE
#
# Foreign Keys
#
#  fk_rails_...  (release_id => releases.id) ON DELETE => cascade
#  fk_rails_...  (user_id => users.id) ON DELETE => nullify
#  fk_rails_...  (workspace_id => workspaces.id) ON DELETE => cascade
#


require "test_helper"

class TaskTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
