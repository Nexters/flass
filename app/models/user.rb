class User < ApplicationRecord
  has_many :lectures
  has_many :answers
  has_many :comments
  has_many :replay_ats, dependent: :destroy
  has_many :notifications, dependent: :destroy

  validates_presence_of :username, :email
  validates :username, :email, uniqueness: true

end
