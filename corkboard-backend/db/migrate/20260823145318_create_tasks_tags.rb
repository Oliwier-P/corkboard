class CreateTasksTags < ActiveRecord::Migration[8.1]
  def change
    create_table :tasks_tags, id: :uuid do |t|
      t.references :task, null: false, foreign_key: true, type: :uuid
      t.references :tag, null: false, foreign_key: true, type: :uuid

      t.timestamps
    end

    add_index :tasks_tags, [:task_id, :tag_id], unique: true
  end
end
