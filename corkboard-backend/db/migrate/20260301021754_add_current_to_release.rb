class AddCurrentToRelease < ActiveRecord::Migration[8.1]
  def change
    add_column :releases, :current, :boolean
  end
end
