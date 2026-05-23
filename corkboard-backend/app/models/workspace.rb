# == Schema Information
#
# Table name: workspaces
#
#  id         :integer          not null, primary key
#  created_at :datetime         not null
#  name       :string
#  owner_id   :integer
#  updated_at :datetime         not null
#




class Workspace < ApplicationRecord
  has_many :releases
  has_many :tasks
  has_many :documents

  has_and_belongs_to_many :users
  belongs_to :owner, class_name: "User", foreign_key: :owner_id

  def current_release
    self.releases.find_by(current: true)
  end

  def next_release
    current_release = self.current_release
    self.releases.where(current: false, status: Release::QUEUED, order: current_release&.order..).order(:order).first
  end
end
