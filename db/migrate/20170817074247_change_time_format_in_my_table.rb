class ChangeTimeFormatInMyTable < ActiveRecord::Migration[5.1]
  def change
    change_column :lectures, :duration, :integer
  end
end
