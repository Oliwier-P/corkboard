# == Schema Information
#
# Table name: tasks_tags
#
#  id         :uuid             not null, primary key
#  created_at :datetime         not null
#  updated_at :datetime         not null
#  tag_id     :uuid             not null
#  task_id    :uuid             not null
#
# Indexes
#
#  index_tasks_tags_on_tag_id              (tag_id)
#  index_tasks_tags_on_task_id             (task_id)
#  index_tasks_tags_on_task_id_and_tag_id  (task_id,tag_id) UNIQUE
#
# Foreign Keys
#
#  fk_rails_...  (tag_id => tags.id)
#  fk_rails_...  (task_id => tasks.id)
#
class TasksTag < ApplicationRecord
  belongs_to :task
  belongs_to :tag
end
