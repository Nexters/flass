class AddOrderToChoices < ActiveRecord::Migration[5.1]
  def change
    add_column :choices, :order, :integer
  end
end
