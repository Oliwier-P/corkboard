next_id = Release.next_release_id(@releases)

json.array!(@releases) do |release|
  json.partial! "releases/release", release: release
  json.set! :next, release.id == next_id
end
