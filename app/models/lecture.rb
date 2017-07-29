class Lecture < ApplicationRecord
  belongs_to :user

  validates_presence_of :title
  validates_presence_of :content
end
