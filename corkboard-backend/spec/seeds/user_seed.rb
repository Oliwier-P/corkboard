RSpec.shared_context 'user_seed' do
  let!(:user1) { User.create!(username: "User1", password: "password123") }
  let!(:user2) { User.create!(username: "User2", password: "password123") }
  let!(:user3) { User.create!(username: "User3", password: "password123") }
  let!(:user4) { User.create!(username: "User4", password: "password123") }
  let!(:user5) { User.create!(username: "User5", password: "password123") }
  let!(:superadmin) { User.create!(username: "superadmin", password: "password123", role: "superadmin") }
end