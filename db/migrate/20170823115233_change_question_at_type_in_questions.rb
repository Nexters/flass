class ChangeQuestionAtTypeInQuestions < ActiveRecord::Migration[5.1]
  def change
    change_column :questions, :question_at, :integer
  end
end
