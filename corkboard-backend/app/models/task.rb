# == Schema Information
#
# Table name: tasks
#
#  id           :uuid             not null, primary key
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
# Foreign Keys
#
#  fk_rails_...  (release_id => releases.id) ON DELETE => cascade
#  fk_rails_...  (user_id => users.id) ON DELETE => nullify
#  fk_rails_...  (workspace_id => workspaces.id) ON DELETE => cascade
#





class Task < ApplicationRecord
  belongs_to :release, optional: true
  belongs_to :workspace
  belongs_to :user, optional: true
  has_many :tasks_tags, dependent: :destroy
  has_many :tags, through: :tasks_tags
  has_one :document, :dependent => :destroy

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

  enum :priority, {
    medium: "medium",
    high: "high",
    urgent: "urgent",
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
