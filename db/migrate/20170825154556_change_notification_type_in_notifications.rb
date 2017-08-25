class ChangeNotificationTypeInNotifications < ActiveRecord::Migration[5.1]
  def change
  	change_column :notifications, :notification_type, :integer
  end
end
