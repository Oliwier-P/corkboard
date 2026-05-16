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
  belongs_to :last_workspace, class_name: "Workspace", optional: true

  after_create :create_workspace

  def email_required?
    false
  end

  def email_changed?
    false
  end

  def email
    self.username
  end

  private

  def create_workspace
    workspaces.create(name: "#{username}'s Workspace", owner: self)
  end
end
