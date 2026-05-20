class AddWorkspaceIdForTasks < ActiveRecord::Migration[8.1]
  def change
    add_column :tasks, :workspace_id, :string
  end
end
