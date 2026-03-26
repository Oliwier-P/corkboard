class CreateWorkspaceInvitation < ActiveRecord::Migration[8.1]
  def change
    create_table :workspace_invitations do |t|
      t.integer :workspace_id
      t.integer :invited_user_id
      t.integer :invited_by_user_id
      t.string :status
      t.timestamps
    end
  end
end
