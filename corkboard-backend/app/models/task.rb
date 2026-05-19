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


class Task < ApplicationRecord
  belongs_to :release

  enum :status, {
    adjustments: "adjustments",
    todo: "todo",
    in_progress: "in_progress",
    review_pending: "review_pending",
    testing: "testing",
    accepted: "accepted"
  }
end
