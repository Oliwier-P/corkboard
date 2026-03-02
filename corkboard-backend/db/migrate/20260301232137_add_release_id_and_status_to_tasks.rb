class AddReleaseIdAndStatusToTasks < ActiveRecord::Migration[8.1]
  def change
    add_column :tasks, :release_id, :integer
    add_column :tasks, :status, :string
  end
end
