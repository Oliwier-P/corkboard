# == Schema Information
#
# Table name: users
#
#  id                     :uuid             not null, primary key
#  encrypted_password     :string           default(""), not null
#  jti                    :string           not null
#  remember_created_at    :datetime
#  reset_password_sent_at :datetime
#  reset_password_token   :string
#  role                   :string           default("user"), not null
#  username               :citext           not null
#  created_at             :datetime         not null
#  updated_at             :datetime         not null
#  last_workspace_id      :uuid
#
# Indexes
#
#  index_users_on_jti                   (jti) UNIQUE
#  index_users_on_reset_password_token  (reset_password_token) UNIQUE
#  index_users_on_username              (username) UNIQUE
#
# Foreign Keys
#
#  fk_rails_...  (last_workspace_id => workspaces.id) ON DELETE => nullify
#
class UserSerializer
  include JSONAPI::Serializer
  attributes :id, :username, :role
end
