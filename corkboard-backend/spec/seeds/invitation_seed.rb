RSpec.shared_context 'invitation_seed' do
  include_context 'workspace_seed'

  let!(:pending_user_invitation) do
    WorkspaceInvitation.create!(workspace: user2_workspace, invited_by_user_id: user2.id,
                                invited_user_id: user3.id, status: "PENDING")
  end
end
