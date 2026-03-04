class AddCurrentToWorkspaces < ActiveRecord::Migration[8.1]
  def change
    add_column :workspaces, :current, :boolean, default: false, null: false
  end
end

