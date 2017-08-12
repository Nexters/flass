class AddSubjectToLectures < ActiveRecord::Migration[5.1]
  def change
    add_column :lectures, :subject, :string
  end
end
