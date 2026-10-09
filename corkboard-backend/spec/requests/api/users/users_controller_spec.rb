require 'rails_helper'

RSpec.describe 'UsersController', type: :request do
  let!(:user1) { User.create!(username: "user1", password: "password123") }
  let!(:user2) { User.create!(username: "user2", password: "password123") }
  let!(:user3) { User.create!(username: "user3", password: "password123") }
  let!(:superadmin) { User.create!(username: "superadmin", password: "password123", role: "superadmin") }

  context 'authorization' do
    it "token" do
      check_authentication(:get, "/users/me")
      check_authentication(:get, "/users")
      check_authentication(:get, "/users/#{user1.id}")
      check_authentication(:put, "/users/#{user1.id}")
      check_authentication(:delete, "/users/#{user1.id}")
    end

    it "permission" do
      check_permission(:put, "/users/#{user1.id}", user2, load_request("update_user1"))
      check_permission(:delete, "/users/#{user1.id}", user2)
    end

    it "params" do
      expect(UsersController::ALLOWED_PARAMS.to_json).to match_json_snapshot("allowed_params")
    end
  end

  context "functionality" do
    it "fetch" do
      # should get user data
      get "/users/me", headers: auth_headers(user1)
      expect(response.body).to match_json_snapshot("me_user1")

      # should get user data
      get "/users/#{user1.id}", headers: auth_headers(user1)
      expect(response.body).to match_json_snapshot("get_user1")

      # should get other user data
      get "/users/#{user1.id}", headers: auth_headers(user2)
      expect(response.body).to match_json_snapshot("get_user1")

      # should get array of users
      get "/users", headers: auth_headers(user1)
      expect(response.body).to match_json_snapshot("get_users")
    end

    it "update" do
      # can update yourself
      put "/users/#{user1.id}", params: load_request("update_user1"), headers: auth_headers(user1)
      expect(response.body).to match_json_snapshot("updated_user1")

      # superadmin can update other users
      put "/users/#{user1.id}", params: load_request("update_user1_by_superadmin"), headers: auth_headers(superadmin)
      expect(response.body).to match_json_snapshot("updated_user1_by_superadmin")
    end

    it "delete" do
      # can delete yourself
      delete "/users/#{user1.id}", headers: auth_headers(user1)
      get "/users", headers: auth_headers(superadmin)
      expect(response.body).to match_json_snapshot("got_users_with_deleted_one_user")

      # superadmin can delete other users
      delete "/users/#{user2.id}", headers: auth_headers(superadmin)
      get "/users", headers: auth_headers(superadmin)
      expect(response.body).to match_json_snapshot("got_users_with_deleted_two_users")
    end
  end
end
