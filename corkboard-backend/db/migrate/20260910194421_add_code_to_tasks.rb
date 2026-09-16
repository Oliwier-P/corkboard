class AddCodeToTasks < ActiveRecord::Migration[8.1]
  def change
    add_column :tasks, :code_name, :string
    add_column :tasks, :code_number, :integer
    add_index :tasks, [:workspace_id, :code_name], unique: true

    up_only do
      Workspace.find_each do |workspace|
        workspace.tasks.order(:created_at).each_with_index do |task, index|
          number = index + 1
          code_name = "#{workspace.code_prefix}-#{number.to_s.rjust(2, '0')}"
          task.update_columns(code_name: code_name, code_number: number)
        end
      end
    end
  end
end
