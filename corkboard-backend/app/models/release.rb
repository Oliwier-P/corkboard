class Release < ApplicationRecord
  belongs_to :workspace
  has_many :tasks

  def next_release
    Release.find_by(workspace_id: self.workspace_id, order: self.order + 1)
  end
end
