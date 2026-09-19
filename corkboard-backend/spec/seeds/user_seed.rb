require 'rails_helper'

RSpec.shared_context 'user_seed' do
  let(:superadmin) { create(:user, superadmin: true) }
  let(:owner) { create(:user) }
  let(:member) { create(:user) }

  let(:workspace) { create(:workspace) }

  let!(:owner_membership)  { create(:workspace_membership, user: owner, workspace: workspace, role: 'owner') }
  let!(:member_membership) { create(:workspace_membership, user: member, workspace: workspace, role: 'member') }
end