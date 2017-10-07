class Lecture < ApplicationRecord
  belongs_to :user
  has_many :questions, dependent: :destroy
  has_many :comments, dependent: :destroy
  has_many :questions

  validates :title, :url, :shorten_url, presence: true
end
