class AddMissingUserPreferences < ActiveRecord::Migration[8.1]
  def up
    User.find_each do |user|
      next if UserPreference.exists?(user_id: user.id)

      UserPreference.create!(user_id: user.id, task_display: "MODAL")
    end
  end
end
