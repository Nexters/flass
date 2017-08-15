class CreateCommentChildren < ActiveRecord::Migration[5.1]
  def change
    create_table :comment_children do |t|
      t.integer :user_id
      t.integer :comment_id
      t.string :content

      t.timestamps
    end
  end
end
