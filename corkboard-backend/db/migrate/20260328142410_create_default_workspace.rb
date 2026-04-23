class CreateDefaultWorkspace < ActiveRecord::Migration[8.1]
  def change
    User.all.each do |u|
      unless u.workspaces.size.positive?
        workspace = Workspace.create!(name: "Default Workspace", owner_id: u.id)
        UsersWorkspaces.create!(user_id: u.id, workspace_id: workspace.id)
      end
    end
  end
end
