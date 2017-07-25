class CreateLectures < ActiveRecord::Migration[5.1]
  def change
    create_table :lectures do |t|
      t.integer :user_id
      t.string :title
      t.text :content
      t.string :url
      t.string :thumbnail_url
      t.time :duration

      t.timestamps
    end
  end
end
