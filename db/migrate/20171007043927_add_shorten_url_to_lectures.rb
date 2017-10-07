class AddShortenUrlToLectures < ActiveRecord::Migration[5.1]
  def change
    add_column :lectures, :shorten_url, :string
  end
end
