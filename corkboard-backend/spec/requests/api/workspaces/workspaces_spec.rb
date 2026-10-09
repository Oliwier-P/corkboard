require 'rails_helper'

RSpec.describe "Workspaces", type: :request do
  let!(:john) { User.create!(username: "john", password: "password123") }

  describe "functionality" do
    it "create" do
      post "/workspaces", params: { name: "New Space" }, headers: auth_headers(john)
      expect(response.body).to match_json_snapshot("john_create_workspace")
    end
  end
end
