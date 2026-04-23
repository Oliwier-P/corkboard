class User < ApplicationRecord
  include Devise::JWT::RevocationStrategies::JTIMatcher

  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable,
         :jwt_authenticatable, jwt_revocation_strategy: self

  validates :username,
            presence: true,
            uniqueness: true,
            format: {
              with: /\A[a-zA-Z0-9_-]+\z/,
              message: "cannot contain spaces"
            }
  validates :password, presence: true, length: { minimum: 6 }
  has_and_belongs_to_many :workspaces

  def email_required?
    false
  end

  def email_changed?
    false
  end

  def email
    self.username
  end
end
