class RemoveColumnFromWorkspaces < ActiveRecord::Migration[8.1]
  def change
    remove_column :workspaces, :current, :string
  end
end
