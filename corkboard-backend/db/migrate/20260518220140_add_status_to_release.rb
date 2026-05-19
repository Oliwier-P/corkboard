class AddStatusToRelease < ActiveRecord::Migration[8.1]
  def change
    add_column :releases, :status, :string
  end
end
