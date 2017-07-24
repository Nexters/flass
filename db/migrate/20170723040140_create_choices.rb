class CreateChoices < ActiveRecord::Migration[5.1]
  def change
    create_table :choices do |t|
      t.integer :question_id
      t.string :answer

      t.timestamps
    end
  end
end
