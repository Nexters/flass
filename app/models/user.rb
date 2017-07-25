class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  has_many :replay_ats
  has_many :lectures
  has_many :answers
  has_many :notifications
  has_many :comments
end
