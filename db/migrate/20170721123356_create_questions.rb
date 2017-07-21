class CreateQuestions < ActiveRecord::Migration[5.1]
  def change
    create_table :questions do |t|
      t.integer :lecture_id
      t.string :content
      t.string :correct_answer
      t.time :question_at
      t.string :hint

      t.timestamps
    end
  end
end
