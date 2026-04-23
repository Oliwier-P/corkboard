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

ActiveRecord::Schema[8.1].define(version: 2026_04_23_213513) do
  # These are extensions that must be enabled in order to support this database
  enable_extension "pg_catalog.plpgsql"

  create_table "releases", force: :cascade do |t|
    t.boolean "completed"
    t.datetime "created_at", null: false
    t.boolean "current"
    t.string "name", null: false
    t.integer "order", null: false
    t.datetime "updated_at", null: false
    t.integer "workspace_id", null: false
  end

  create_table "tasks", force: :cascade do |t|
    t.datetime "created_at", null: false
    t.string "description"
    t.string "name"
    t.integer "order"
    t.integer "release_id"
    t.string "status"
    t.datetime "updated_at", null: false
  end

  create_table "users", force: :cascade do |t|
    t.datetime "created_at", null: false
    t.string "encrypted_password", default: "", null: false
    t.string "jti", null: false
    t.datetime "remember_created_at"
    t.datetime "reset_password_sent_at"
    t.string "reset_password_token"
    t.datetime "updated_at", null: false
    t.string "username"
    t.index ["jti"], name: "index_users_on_jti", unique: true
    t.index ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true
  end

  create_table "users_workspaces", id: false, force: :cascade do |t|
    t.bigint "user_id", null: false
    t.bigint "workspace_id", null: false
    t.index ["user_id", "workspace_id"], name: "index_users_workspaces_on_user_id_and_workspace_id"
    t.index ["workspace_id", "user_id"], name: "index_users_workspaces_on_workspace_id_and_user_id"
  end

  create_table "workspace_invitations", force: :cascade do |t|
    t.datetime "created_at", null: false
    t.integer "invited_by_user_id"
    t.integer "invited_user_id"
    t.string "status"
    t.datetime "updated_at", null: false
    t.integer "workspace_id"
  end

  create_table "workspaces", force: :cascade do |t|
    t.datetime "created_at", null: false
    t.string "name"
    t.integer "owner_id"
    t.datetime "updated_at", null: false
  end

  add_foreign_key "releases", "workspaces"
  add_foreign_key "workspaces", "users", column: "owner_id", on_delete: :nullify
end
