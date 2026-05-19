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
#  user_id     :integer
#
# Indexes
#
#  index_tasks_on_user_id  (user_id)
#


class Task < ApplicationRecord
  belongs_to :release
  belongs_to :user, optional: true

  enum :status, {
    adjustments: "adjustments",
    todo: "todo",
    in_progress: "in_progress",
    review_pending: "review_pending",
    testing: "testing",
    accepted: "accepted"
  }
end
