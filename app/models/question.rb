class Question < ApplicationRecord
  belongs_to :lecture
  has_many :choices
  has_many :answers
end
