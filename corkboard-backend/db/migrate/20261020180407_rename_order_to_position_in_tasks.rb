class RenameOrderToPositionInTasks < ActiveRecord::Migration[8.1]
  def change
    rename_column :tasks, :order, :position
    add_index :tasks, [:release_id, :status, :position]
  end
end
