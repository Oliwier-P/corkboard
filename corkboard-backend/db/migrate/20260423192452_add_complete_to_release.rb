class AddCompleteToRelease < ActiveRecord::Migration[8.1]
  def change
    add_column :releases, :completed, :boolean
  end
end
