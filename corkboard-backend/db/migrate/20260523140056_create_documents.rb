class CreateDocuments < ActiveRecord::Migration[8.1]
  def change
    create_table :documents do |t|
      t.string :name
      t.jsonb :content
      t.references :owner, null: false, foreign_key: { to_table: :users }
      t.references :workspace, null: false, foreign_key: true

      t.timestamps
    end
  end
end
