class CreateReleases < ActiveRecord::Migration[8.1]
  def change
    create_table :releases do |t|
      t.string :name, null: false
      t.integer :order, null: false
      t.integer :workspace_id, null: false
      t.foreign_key :workspaces, column: :workspace_id

      t.timestamps
    end
  end
end
