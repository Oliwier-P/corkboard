class Workspace < ApplicationRecord
  has_many :releases
  has_and_belongs_to_many :users
end