RSpec.shared_context 'tag_seed' do
  include_context 'release_seed'

  let!(:user1_workspace_tag_bug) { Tag.create!(name: "Bug", color: "#ef4444", workspace: user1_workspace) }
  let!(:user1_workspace_tag_feature) { Tag.create!(name: "Feature", color: "#22c55e", workspace: user1_workspace) }
  let!(:user1_workspace_tag_docs) { Tag.create!(name: "Docs", color: "#3b82f6", workspace: user1_workspace) }
  let!(:user2_workspace_tag_bug) { Tag.create!(name: "Bug", color: "#ef4444", workspace: user2_workspace) }
  let!(:user3_workspace_tag_feature) { Tag.create!(name: "Feature", color: "#22c55e", workspace: user3_workspace) }
end
