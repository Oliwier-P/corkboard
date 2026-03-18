class CreateJoinTableWorkspacesUsers < ActiveRecord::Migration[8.1]
  def change
    create_join_table :workspaces, :users do |t|
      t.index [:workspace_id, :user_id]
      t.index [:user_id, :workspace_id]
    end
  end
end
