require "test_helper"

# == Schema Information
#
# Table name: user_preferences
#
#  id              :uuid             not null, primary key
#  show_board_tags :boolean          default(TRUE)
#  task_display    :string           default(NULL), not null
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#  user_id         :uuid             not null
#
# Indexes
#
#  index_user_preferences_on_user_id  (user_id) UNIQUE
#
# Foreign Keys
#
#  fk_rails_...  (user_id => users.id) ON DELETE => cascade
#
class UserPreferenceTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
