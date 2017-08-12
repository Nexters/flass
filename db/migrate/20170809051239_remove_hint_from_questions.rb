class RemoveHintFromQuestions < ActiveRecord::Migration[5.1]
  def change
    remove_column :questions, :hint, :string
  end
end
