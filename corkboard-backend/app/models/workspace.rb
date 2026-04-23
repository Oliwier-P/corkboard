# == Schema Information
#
# Table name: workspaces
#
#  id         :integer          not null, primary key
#  name       :string
#  created_at :datetime         not null
#  updated_at :datetime         not null
#  owner_id   :integer
#

class Workspace < ApplicationRecord
  has_many :releases
  has_and_belongs_to_many :users
  belongs_to :owner, class_name: "User", foreign_key: :owner_id
end
