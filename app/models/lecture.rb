class Lecture < ApplicationRecord
  belongs_to :user
  has_many :comments, dependent: :destroy
  
  validates_presence_of :title, :content, message: '제목과 내용을 입력해주세요!'
end
