class AddCodePrefixToWorkspaces < ActiveRecord::Migration[8.1]
  def change
    add_column :workspaces, :code_prefix, :string, limit: 3

    up_only do
      Workspace.find_each do |workspace|
        workspace.generate_code_prefix!
      end
    end
  end
end
