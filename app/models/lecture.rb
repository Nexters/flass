class Lecture < ApplicationRecord
  belongs_to :user
  has_many :questions
  has_many :comments, dependent: :destroy

  validates :title, :url, presence: true
end
