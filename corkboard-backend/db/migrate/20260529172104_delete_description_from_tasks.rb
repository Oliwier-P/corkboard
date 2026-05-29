class DeleteDescriptionFromTasks < ActiveRecord::Migration[8.1]
  def change
    remove_column :tasks, :description, :string
  end
end
