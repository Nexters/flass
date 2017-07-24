class Lecture < ApplicationRecord
  belongs_to :user
  has_many :questions
  has_many :replay_ats
  has_many :comments
end
