json.collaborators do
  json.array! @users do |user|
    json.extract! user, :id, :username
  end
end

json.invited_users do
  json.array! @invited_users do |user|
    json.extract! user, :id, :username
  end
end