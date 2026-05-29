class AddTaskIdToDocuments < ActiveRecord::Migration[8.1]
  def change
    add_reference :documents, :task, null: true, foreign_key: true
  end
end
