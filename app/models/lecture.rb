class Lecture < ApplicationRecord
  belongs_to :user
  has_many :questions, dependent: :destroy
  has_many :comments, dependent: :destroy

  validates :title, :url, presence: true
end
