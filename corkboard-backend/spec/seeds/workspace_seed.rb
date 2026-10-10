RSpec.shared_context 'workspace_seed' do
  include_context 'user_seed'

  let!(:user1_workspace) { Workspace.find_by!(name: "User1's Workspace") }
  let!(:user2_workspace) { Workspace.find_by!(name: "User2's Workspace") }
  let!(:user3_workspace) { Workspace.find_by!(name: "User3's Workspace") }
  let!(:user4_workspace) { Workspace.find_by!(name: "User4's Workspace") }
  let!(:user5_workspace) { Workspace.find_by!(name: "User5's Workspace") }
  let!(:second_user1_workspace) { Workspace.create!(name: "User1 Workspace Two", owner: user1) }
  let!(:second_user2_workspace) { Workspace.create!(name: "User2 Workspace Two", owner: user2) }
  let!(:second_user3_workspace) { Workspace.create!(name: "User3 Workspace Two", owner: user3) }

  before do
    second_user1_workspace.users << [user2, user3, user4, user5]
    second_user2_workspace.users << [user1]
    second_user3_workspace.users << [user4, user5]
  end
end