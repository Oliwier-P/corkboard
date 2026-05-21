# == Schema Information
#
# Table name: tasks
#
#  id           :integer          not null, primary key
#  created_at   :datetime         not null
#  description  :string
#  name         :string
#  order        :integer
#  release_id   :integer
#  status       :string
#  updated_at   :datetime         not null
#  user_id      :integer
#  workspace_id :string
#
# Indexes
#
#  index_tasks_on_user_id  (user_id)
#


require "test_helper"

class TaskTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
