# == Schema Information
#
# Table name: tasks
#
#  id           :integer          not null, primary key
#  created_at   :datetime         not null
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
  has_one :document

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

  def broadcast_to_release(type, current_user)
    ActionCable.server.broadcast "release_#{self.release_id}", {
      type: type,
      task: {
        id: self.id,
        name: self.name,
        status: self.status,
        order: self.order,
        release_id: self.release_id,
        workspace_id: self.workspace_id,
        actor_id: current_user.id,
        user: self.user ? {
          id: self.user.id,
          username: self.user.username,
        } : nil
      }
    }
  end
end
