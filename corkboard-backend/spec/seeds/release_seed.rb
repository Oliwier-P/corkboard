RSpec.shared_context 'release_seed' do
  include_context 'workspace_seed'

  let!(:user1_workspace_release) { Release.create!(name: "User1 Workspace Release", workspace: user1_workspace, order: 0, current: true, status: "QUEUED") }
  let!(:user1_workspace_release_two) { Release.create!(name: "User1 Workspace Release Two", workspace: user1_workspace, order: 1, current: false, status: "QUEUED") }
  let!(:user2_workspace_release) { Release.create!(name: "User2 Workspace Release", workspace: user2_workspace, order: 0, current: true, status: "QUEUED") }
  let!(:user3_workspace_release) { Release.create!(name: "User3 Workspace Release", workspace: user3_workspace, order: 0, current: true, status: "QUEUED") }
end
