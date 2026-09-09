class AddSpellcheckToPreferences < ActiveRecord::Migration[8.1]
  def change
    add_column :user_preferences, :spellcheck, :boolean, default: false
  end
end
