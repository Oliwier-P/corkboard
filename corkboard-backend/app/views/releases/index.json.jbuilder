next_id = Release.next_release_id(@releases)

json.array!(@releases) do |release|
  json.extract! release, :id, :name, :current, :position, :status, :progress
  json.set! :next, release.id == next_id
end
