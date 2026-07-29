class CreateUserPreferences < ActiveRecord::Migration[8.1]
  def change
    create_table :user_preferences do |t|
      t.references :user, null: false, foreign_key: true, index: { unique: true }
      t.string :task_display, null: false, default: "MODAL"

      t.timestamps
    end
  end
end
