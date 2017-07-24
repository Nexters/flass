class CreateNotifications < ActiveRecord::Migration[5.1]
  def change
    create_table :notifications do |t|
      t.integer :user_id
      t.string :type
      t.string :content
      t.string :url

      t.timestamps
    end
  end
end
