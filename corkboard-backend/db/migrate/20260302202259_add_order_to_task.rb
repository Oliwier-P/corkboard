class AddOrderToTask < ActiveRecord::Migration[8.1]
  def change
    add_column :tasks, :order, :integer
  end
end
