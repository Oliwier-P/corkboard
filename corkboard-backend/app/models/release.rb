class Release < ApplicationRecord
  has_one :workspace
  has_many :tasks
end
