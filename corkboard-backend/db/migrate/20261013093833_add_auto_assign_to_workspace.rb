class AddAutoAssignToWorkspace < ActiveRecord::Migration[8.1]
  def change
    add_column :workspaces, :auto_assign, :boolean, default: false
  end
end
