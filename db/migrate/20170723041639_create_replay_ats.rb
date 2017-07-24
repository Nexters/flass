class CreateReplayAts < ActiveRecord::Migration[5.1]
  def change
    create_table :replay_ats do |t|
      t.integer :user_id
      t.integer :lecture_id
      t.time :playtime

      t.timestamps
    end
  end
end
