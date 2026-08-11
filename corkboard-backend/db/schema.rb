# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema[8.1].define(version: 2026_08_11_194000) do
  # These are extensions that must be enabled in order to support this database
  enable_extension "citext"
  enable_extension "pg_catalog.plpgsql"
  enable_extension "pgcrypto"

  create_table "documents", id: :uuid, default: -> { "gen_random_uuid()" }, force: :cascade do |t|
    t.jsonb "content"
    t.datetime "created_at", null: false
    t.string "name"
    t.uuid "owner_id", null: false
    t.uuid "task_id"
    t.datetime "updated_at", null: false
    t.uuid "workspace_id", null: false
    t.binary "yjs_state"
  end

  create_table "releases", id: :uuid, default: -> { "gen_random_uuid()" }, force: :cascade do |t|
    t.boolean "completed"
    t.datetime "created_at", null: false
    t.boolean "current"
    t.string "name", null: false
    t.integer "order", null: false
    t.string "status", default: "NOT_QUEUED"
    t.datetime "updated_at", null: false
    t.uuid "workspace_id", null: false
  end

  create_table "tasks", id: :uuid, default: -> { "gen_random_uuid()" }, force: :cascade do |t|
    t.datetime "created_at", null: false
    t.string "name"
    t.integer "order"
    t.string "priority"
    t.uuid "release_id"
    t.string "status"
    t.datetime "updated_at", null: false
    t.uuid "user_id"
    t.uuid "workspace_id"
  end

  create_table "user_preferences", id: :uuid, default: -> { "gen_random_uuid()" }, force: :cascade do |t|
    t.datetime "created_at", null: false
    t.string "task_display", default: "MODAL", null: false
    t.datetime "updated_at", null: false
    t.uuid "user_id", null: false
    t.index ["user_id"], name: "index_user_preferences_on_user_id", unique: true
  end

  create_table "users", id: :uuid, default: -> { "gen_random_uuid()" }, force: :cascade do |t|
    t.datetime "created_at", null: false
    t.string "encrypted_password", default: "", null: false
    t.string "jti", null: false
    t.uuid "last_workspace_id"
    t.datetime "remember_created_at"
    t.datetime "reset_password_sent_at"
    t.string "reset_password_token"
    t.string "role", default: "user", null: false
    t.datetime "updated_at", null: false
    t.citext "username", null: false
    t.index ["jti"], name: "index_users_on_jti", unique: true
    t.index ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true
    t.index ["username"], name: "index_users_on_username", unique: true
  end

  create_table "users_workspaces", id: false, force: :cascade do |t|
    t.uuid "user_id", null: false
    t.uuid "workspace_id", null: false
    t.index ["user_id", "workspace_id"], name: "index_users_workspaces_on_user_id_and_workspace_id"
    t.index ["workspace_id", "user_id"], name: "index_users_workspaces_on_workspace_id_and_user_id"
  end

  create_table "workspace_invitations", id: :uuid, default: -> { "gen_random_uuid()" }, force: :cascade do |t|
    t.datetime "created_at", null: false
    t.uuid "invited_by_user_id"
    t.uuid "invited_user_id"
    t.string "status"
    t.datetime "updated_at", null: false
    t.uuid "workspace_id", null: false
  end

  create_table "workspaces", id: :uuid, default: -> { "gen_random_uuid()" }, force: :cascade do |t|
    t.datetime "created_at", null: false
    t.boolean "current", default: false, null: false
    t.string "name", null: false
    t.uuid "owner_id"
    t.datetime "updated_at", null: false
  end

  add_foreign_key "documents", "tasks", on_delete: :nullify
  add_foreign_key "documents", "users", column: "owner_id", on_delete: :cascade
  add_foreign_key "documents", "workspaces", on_delete: :cascade
  add_foreign_key "releases", "workspaces", on_delete: :cascade
  add_foreign_key "tasks", "releases", on_delete: :cascade
  add_foreign_key "tasks", "users", on_delete: :nullify
  add_foreign_key "tasks", "workspaces", on_delete: :cascade
  add_foreign_key "user_preferences", "users", on_delete: :cascade
  add_foreign_key "users", "workspaces", column: "last_workspace_id", on_delete: :nullify
  add_foreign_key "users_workspaces", "users", on_delete: :cascade
  add_foreign_key "users_workspaces", "workspaces", on_delete: :cascade
  add_foreign_key "workspace_invitations", "users", column: "invited_by_user_id", on_delete: :cascade
  add_foreign_key "workspace_invitations", "users", column: "invited_user_id", on_delete: :cascade
  add_foreign_key "workspace_invitations", "workspaces"
  add_foreign_key "workspaces", "users", column: "owner_id", on_delete: :nullify
end
