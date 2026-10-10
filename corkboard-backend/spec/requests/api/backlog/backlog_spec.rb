require 'rails_helper'

describe "UserPreferences", type: :request do
  include_context 'user_seed'

  context 'authorization' do
    it "token" do
      check_authentication(:put, "/user_preferences")
    end

    it "permission" do
      check_permission(:put, "/backlog/#{}")
    end
  end

  context "functionality" do
    it "update" do
      # can update your preferences
      put "/user_preferences", params: load_request("update_user1_preferences"), headers: auth_headers(user1)
      expect(response.body).to match_json_snapshot("updated_user1_preferences")
    end
  end
end