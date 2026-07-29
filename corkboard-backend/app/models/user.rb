# == Schema Information
#
# Table name: users
#
#  id                     :bigint           not null, primary key
#  encrypted_password     :string           default(""), not null
#  jti                    :string           not null
#  remember_created_at    :datetime
#  reset_password_sent_at :datetime
#  reset_password_token   :string
#  username               :string
#  created_at             :datetime         not null
#  updated_at             :datetime         not null
#  last_workspace_id      :bigint
#
# Indexes
#
#  index_users_on_jti                   (jti) UNIQUE
#  index_users_on_last_workspace_id     (last_workspace_id)
#  index_users_on_reset_password_token  (reset_password_token) UNIQUE
#
# Foreign Keys
#
#  fk_rails_...  (last_workspace_id => workspaces.id)
#
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
  has_many :documents, foreign_key: :owner_id
  has_one :user_preference
  belongs_to :last_workspace, class_name: "Workspace", optional: true

  after_create :create_workspace
  after_create :create_preference

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
    workspaces.create!(name: "#{username}'s Workspace", owner: self)
  end

  def create_preference
    create_user_preference! unless user_preference
  end
end
