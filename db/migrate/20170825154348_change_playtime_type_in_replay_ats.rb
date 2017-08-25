class ChangePlaytimeTypeInReplayAts < ActiveRecord::Migration[5.1]
  def change
  	change_column :replay_ats, :playtime, :integer
  end
end
