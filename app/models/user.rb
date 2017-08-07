class User < ApplicationRecord
  has_many :lectures, dependent: :destroy
  has_many :answers, dependent: :destroy
  has_many :comments, dependent: :destroy
  has_many :replay_ats, dependent: :destroy
  has_many :notifications, dependent: :destroy
  acts_as_voter
  
  validates_presence_of :username, :email
  validates :username, :email, uniqueness: true

end
