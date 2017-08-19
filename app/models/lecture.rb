class Lecture < ApplicationRecord
  belongs_to :user
  has_many :comments, dependent: :destroy
  has_many :questions

  validates :title, :url, presence: true
end
