class ChangeDateFormatInMyTable < ActiveRecord::Migration[5.1]
  def change
    change_column :questions, :correct_answer, :integer
  end
end

