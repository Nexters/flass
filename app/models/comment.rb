class Comment < ApplicationRecord
  belongs_to :user
  belongs_to :lecture
  has_many :comment_child, dependent: :destroy
  acts_as_votable
end
