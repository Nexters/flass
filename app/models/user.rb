class User < ApplicationRecord

  validates_presence_of :username, :email
  validates :username, :email, uniqueness: true

end
