RSpec.shared_context 'document_seed' do
  include_context 'task_seed'

  let!(:user1_workspace_document) do
    Document.create!(name: "User1 Document", owner: user1, workspace: user1_workspace,
                     content: { type: "doc", content: [] })
  end
  let!(:user1_workspace_task_document) do
    Document.create!(name: "User1 Task Document", owner: user1, workspace: user1_workspace,
                     task: user1_workspace_task, content: { type: "doc", content: [] })
  end
  let!(:user2_workspace_document) do
    Document.create!(name: "User2 Document", owner: user2, workspace: user2_workspace,
                     content: { type: "doc", content: [] })
  end
end
