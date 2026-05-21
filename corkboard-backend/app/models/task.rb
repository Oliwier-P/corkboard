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


class Task < ApplicationRecord
  belongs_to :release, optional: true
  belongs_to :workspace
  belongs_to :user, optional: true

  before_save :clear_release_id_for_backlog

  enum :status, {
    backlog: "backlog",
    adjustments: "adjustments",
    todo: "todo",
    in_progress: "in_progress",
    review_pending: "review_pending",
    testing: "testing",
    accepted: "accepted"
  }

  def clear_release_id_for_backlog
    if self.status_changed? && self.status == "backlog"
      self.release_id = nil
    end
  end
end
