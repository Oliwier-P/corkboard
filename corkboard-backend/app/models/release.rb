# == Schema Information
#
# Table name: releases
#
#  id           :integer          not null, primary key
#  name         :string           not null
#  order        :integer          not null
#  workspace_id :integer          not null
#  created_at   :datetime         not null
#  updated_at   :datetime         not null
#  current      :boolean
#  completed    :boolean
#

class Release < ApplicationRecord
  belongs_to :workspace
  has_many :tasks

  before_save :defaults

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

  def defaults
    self.completed ||= false
  end
end
