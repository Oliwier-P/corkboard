# == Schema Information
#
# Table name: tasks
#
#  id          :integer          not null, primary key
#  created_at  :datetime         not null
#  description :string
#  name        :string
#  order       :integer
#  release_id  :integer
#  status      :string
#  updated_at  :datetime         not null
#


require "test_helper"

class TaskTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
