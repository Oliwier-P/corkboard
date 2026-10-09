require 'rails_helper'

RSpec.shared_context 'user_seed' do
  let(:superadmin) { create(:user, superadmin: true) }
  let(:user1) { create(:user) }
  let(:user2) { create(:user) }
  let(:user4) { create(:user) }
  let(:user5) { create(:user) }

  let(:workspace) { create(:workspace) }

  let!(:owner_membership)  { create(:workspace_membership, user: owner, workspace: workspace, role: 'owner') }
  let!(:member_membership) { create(:workspace_membership, user: member, workspace: workspace, role: 'member') }
end