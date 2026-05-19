class PopulateStatusForReleases < ActiveRecord::Migration[8.1]
  def change
    Release.where(status: nil).update_all(status: Release::NOT_QUEUED)
  end
end
