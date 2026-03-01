class AddOwnerIdToWorkspace < ActiveRecord::Migration[8.1]
  def change
    add_column :workspaces, :owner_id, :integer
    add_foreign_key :workspaces, :users, column: :owner_id, on_delete: :nullify
  end
end
