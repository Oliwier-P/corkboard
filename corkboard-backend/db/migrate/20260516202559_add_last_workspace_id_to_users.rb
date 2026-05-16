class AddLastWorkspaceIdToUsers < ActiveRecord::Migration[8.1]
  def change
    add_reference :users, :last_workspace, foreign_key: { to_table: :workspaces }
  end
end
