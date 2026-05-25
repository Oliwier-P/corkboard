class AddYjsStateToDocuments < ActiveRecord::Migration[8.1]
  def change
    add_column :documents, :yjs_state, :binary
  end
end
