class CreateComments < ActiveRecord::Migration[5.1]
  def change
    create_table :comments do |t|
      t.integer :user_id
      t.integer :lecture_id
      t.string :myProfileURL
      t.string :content

      t.timestamps
    end
  end
end
