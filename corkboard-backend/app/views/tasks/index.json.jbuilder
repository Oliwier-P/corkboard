json.adjustments do
  json.array! @tasks.where(status: "adjustments").order(:order) do |task|
    json.extract! task, :id, :name, :status, :order
  end
end

json.todo do
  json.array! @tasks.where(status: "todo").order(:order)  do |task|
    json.extract! task, :id, :name, :status
  end
end

json.in_progress do
  json.array! @tasks.where(status: "in_progress").order(:order)  do |task|
    json.extract! task, :id, :name, :status
  end
end

json.review_pending do
  json.array! @tasks.where(status: "review_pending").order(:order)  do |task|
    json.extract! task, :id, :name, :status
  end
end

json.testing do
  json.array! @tasks.where(status: "testing").order(:order)  do |task|
    json.extract! task, :id, :name, :status
  end
end

json.accepted do
  json.array! @tasks.where(status: "accepted").order(:order)  do |task|
    json.extract! task, :id, :name, :status
  end
end