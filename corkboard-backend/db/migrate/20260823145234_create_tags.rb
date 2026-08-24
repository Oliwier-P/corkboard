class CreateTags < ActiveRecord::Migration[8.1]
  def change
    create_table :tags, id: :uuid do |t|
      t.string :name, null: false
      t.string :color, null: false
      t.references :workspace, null: false, foreign_key: true, type: :uuid

      t.timestamps
    end

    add_index :tags, [:workspace_id, :name]
  end
end
