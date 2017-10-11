class User < ApplicationRecord
  has_many :lectures
  has_many :answers
  has_many :comments
  has_many :comment_children
  has_many :replay_ats, dependent: :destroy
  has_many :notifications, dependent: :destroy
  acts_as_voter

  validates_presence_of :username, :email
  validates :email, uniqueness: true

end
