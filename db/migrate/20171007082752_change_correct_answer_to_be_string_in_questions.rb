class ChangeCorrectAnswerToBeStringInQuestions < ActiveRecord::Migration[5.1]
  def change
    change_column :questions, :correct_answer, :string
  end
end
