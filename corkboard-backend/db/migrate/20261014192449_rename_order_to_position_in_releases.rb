class RenameOrderToPositionInReleases < ActiveRecord::Migration[8.1]
  def change
    rename_column :releases, :order, :position
    add_index :releases, [:workspace_id, :status, :position]
  end
end
