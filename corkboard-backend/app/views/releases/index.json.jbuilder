json.releases do
  json.array!(@releases) do |release|
    json.extract! release, :id, :name
  end
end

json.current_release_id @current_release&.id
json.next_release_id @current_release&.next_release&.id
