RSpec.shared_context 'document_seed' do
  include_context 'task_seed'

  let!(:user1_workspace_document) do
    Document.create!(name: "User1 Document", owner: user1, workspace_id: user1_workspace.id,
                     content: { type: "doc", content: [] })
  end
  let!(:user1_workspace_task_document) do
    Document.create!(name: "User1 Task Document", owner: user1, workspace_id: user1_workspace.id,
                     task_id: user1_workspace_task.id, content: { type: "doc", content: [] })
  end
  let!(:user2_workspace_document) do
    Document.create!(name: "User2 Document", owner: user2, workspace_id: user2_workspace.id,
                     content: { type: "doc", content: [] })
  end
end
