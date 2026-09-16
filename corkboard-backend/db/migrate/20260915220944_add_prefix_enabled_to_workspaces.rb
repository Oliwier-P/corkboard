class AddPrefixEnabledToWorkspaces < ActiveRecord::Migration[8.1]
  def change
    add_column :workspaces, :code_prefix_enabled, :boolean, default: false
  end
end
