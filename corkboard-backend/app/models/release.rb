class Release < ApplicationRecord
  belongs_to :workspace
  has_many :tasks

  def next_release
    Release.find_by(workspace_id: self.workspace_id, order: self.order + 1)
  end

  def progress
    tasks = self.tasks.size
    accepted_tasks = self.tasks.where(status: Task.statuses[:accepted]).size

    if tasks.size.positive?
      { tasks:, accepted_tasks: }
    else
      nil
    end
  end
end
