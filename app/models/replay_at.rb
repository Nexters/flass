class ReplayAt < ApplicationRecord
  belongs_to :user
  belongs_to :lecture

  validates :playtime, presence: true
end
