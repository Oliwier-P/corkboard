class Task < ApplicationRecord
  belongs_to :release

  enum :status, {
    adjustments: "adjustments",
    todo: "todo",
    in_progress: "in_progress",
    review_pending: "review_pending",
    testing: "testing",
    accepted: "accepted",
  }
end
