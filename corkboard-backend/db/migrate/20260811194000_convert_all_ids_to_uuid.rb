class ConvertAllIdsToUuid < ActiveRecord::Migration[8.1]
  def change
    enable_extension 'pgcrypto'
    enable_extension 'citext'

    create_table :users, id: :uuid, default: -> { 'gen_random_uuid()' } do |t|
      ## Database authenticatable
      t.citext :username, null: false
      t.string :encrypted_password, null: false, default: ""

      ## Recoverable
      t.string   :reset_password_token
      t.datetime :reset_password_sent_at

      ## Rememberable
      t.datetime :remember_created_at

      ## Trackable (commented out in original)
      # t.integer  :sign_in_count, default: 0, null: false
      # t.datetime :current_sign_in_at
      # t.datetime :last_sign_in_at
      # t.string   :current_sign_in_ip
      # t.string   :last_sign_in_ip

      ## Confirmable (commented out in original)
      # t.string   :confirmation_token
      # t.datetime :confirmed_at
      # t.datetime :confirmation_sent_at
      # t.string   :unconfirmed_email

      ## Lockable (commented out in original)
      # t.integer  :failed_attempts, default: 0, null: false
      # t.string   :unlock_token
      # t.datetime :locked_at

      ## JWT
      t.string :jti, null: false

      ## Role
      t.string :role, default: 'user', null: false

      ## Workspace tracking
      t.uuid :last_workspace_id

      t.timestamps null: false
    end

    add_index :users, :username, unique: true
    add_index :users, :reset_password_token, unique: true
    add_index :users, :jti, unique: true

    create_table :workspaces, id: :uuid, default: -> { 'gen_random_uuid()' } do |t|
      t.string :name, null: false
      t.uuid :owner_id, null: true
      t.boolean :current, default: false, null: false

      t.timestamps
    end

    add_foreign_key :workspaces, :users, column: :owner_id, on_delete: :nullify
    add_foreign_key :users, :workspaces, column: :last_workspace_id, on_delete: :nullify

    create_table :users_workspaces, id: false do |t|
      t.uuid :workspace_id, null: false
      t.uuid :user_id, null: false
      t.index [:workspace_id, :user_id]
      t.index [:user_id, :workspace_id]
    end

    add_foreign_key :users_workspaces, :workspaces, on_delete: :cascade
    add_foreign_key :users_workspaces, :users, on_delete: :cascade

    create_table :workspace_invitations, id: :uuid, default: -> { 'gen_random_uuid()' } do |t|
      t.uuid :workspace_id, null: false
      t.uuid :invited_user_id
      t.uuid :invited_by_user_id
      t.string :status

      t.timestamps
    end

    add_foreign_key :workspace_invitations, :workspaces
    add_foreign_key :workspace_invitations, :users, column: :invited_user_id, on_delete: :cascade
    add_foreign_key :workspace_invitations, :users, column: :invited_by_user_id, on_delete: :cascade

    create_table :releases, id: :uuid, default: -> { 'gen_random_uuid()' } do |t|
      t.string :name, null: false
      t.integer :order, null: false
      t.uuid :workspace_id, null: false
      t.boolean :current
      t.boolean :completed
      t.string :status, default: 'NOT_QUEUED'

      t.timestamps
    end

    add_foreign_key :releases, :workspaces, on_delete: :cascade

    create_table :tasks, id: :uuid, default: -> { 'gen_random_uuid()' } do |t|
      t.string :name
      t.uuid :release_id
      t.string :status
      t.integer :order
      t.uuid :user_id
      t.uuid :workspace_id
      t.string :priority

      t.timestamps
    end

    add_foreign_key :tasks, :releases, on_delete: :cascade
    add_foreign_key :tasks, :users, on_delete: :nullify
    add_foreign_key :tasks, :workspaces, on_delete: :cascade

    create_table :documents, id: :uuid, default: -> { 'gen_random_uuid()' } do |t|
      t.string :name
      t.jsonb :content
      t.uuid :owner_id, null: false
      t.uuid :workspace_id, null: false
      t.uuid :task_id
      t.binary :yjs_state

      t.timestamps
    end

    add_foreign_key :documents, :users, column: :owner_id, on_delete: :cascade
    add_foreign_key :documents, :workspaces, on_delete: :cascade
    add_foreign_key :documents, :tasks, on_delete: :nullify

    create_table :user_preferences, id: :uuid, default: -> { 'gen_random_uuid()' } do |t|
      t.uuid :user_id, null: false
      t.string :task_display, null: false, default: "MODAL"

      t.timestamps
    end

    add_index :user_preferences, :user_id, unique: true
    add_foreign_key :user_preferences, :users, on_delete: :cascade
  end
end