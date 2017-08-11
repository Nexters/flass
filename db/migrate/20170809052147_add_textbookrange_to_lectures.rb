class AddTextbookrangeToLectures < ActiveRecord::Migration[5.1]
  def change
    add_column :lectures, :textbook_range, :string
  end
end
