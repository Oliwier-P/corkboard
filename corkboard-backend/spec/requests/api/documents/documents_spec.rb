require 'rails_helper'

describe "Documents", type: :request do
  include_context 'document_seed'

  context 'authorization' do
    it "token" do
      check_authentication(:get, "/backlog/#{user1_workspace.id}")
    end

    it "permission" do
      [user2, superadmin].each do |user|
        aggregate_failures("as #{user.username}") do
          check_permission(:get, "/backlog/#{user1_workspace.id}", user)
        end
      end
    end

    it "params" do
      expect(DocumentsController::ALLOWED_PARAMS.to_json).to match_json_snapshot("allowed_params")
    end
  end

  context "functionality" do
    it "update" do
      #
      get "/backlog/#{user1_workspace.id}", headers: auth_headers(user1)
      expect(response.body).to match_json_snapshot("user1_workspace_backlog")
    end
  end
end