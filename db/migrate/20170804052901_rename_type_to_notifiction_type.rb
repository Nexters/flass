class RenameTypeToNotifictionType < ActiveRecord::Migration[5.1]
  def change
  	rename_column :notifications, :type, :notification_type
  end
end
