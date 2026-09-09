class AddTagsSettingsToPreferences < ActiveRecord::Migration[8.1]
  def change
    add_column :user_preferences, :show_board_tags, :boolean, default: true
  end
end
