RSpec.shared_context 'task_seed' do
  include_context 'tag_seed'

  let!(:user1_workspace_task) do
    Task.create!(name: "User1 Task One", workspace: user1_workspace, release: user1_workspace_release,
                 user: user1, position: 0, status: "todo")
  end
  let!(:user1_workspace_task_two) do
    Task.create!(name: "User1 Task Two", workspace: user1_workspace, release: user1_workspace_release,
                 user: user1, position: 1, status: "in_progress", priority: "medium")
  end
  let!(:user1_workspace_task_three) do
    Task.create!(name: "User1 Task Three", workspace: user1_workspace, release: user1_workspace_release_two,
                 user: nil, position: 0, status: "accepted")
  end
  let!(:user1_workspace_backlog_task) do
    Task.create!(name: "User1 Backlog Task", workspace: user1_workspace, release: nil,
                 user: nil, position: 0, status: "backlog", priority: "high")
  end

  let!(:user2_workspace_task) do
    Task.create!(name: "User2 Task One", workspace: user2_workspace, release: user2_workspace_release,
                 user: user2, position: 0, status: "todo", priority: "medium")
  end
  let!(:user3_workspace_task) do
    Task.create!(name: "User3 Task One", workspace: user3_workspace, release: user3_workspace_release,
                 user: user3, position: 0, status: "todo")
  end

  before do
    user1_workspace_task.tags << [user1_workspace_tag_bug, user1_workspace_tag_feature]
    user1_workspace_task_two.tags << user1_workspace_tag_docs
    user2_workspace_task.tags << user2_workspace_tag_bug
  end
end
