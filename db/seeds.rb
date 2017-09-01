# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

User.delete_all
Lecture.delete_all

1.upto(10) do |i|
	User.create({username: 'user_' + i.to_s, email: 'user_' + i.to_s, myprofileurl: 'user_' + i.to_s})
end

User.create({id: 22, username: "Yay Shin", email: "yehoonshin@gmail.com", myprofileurl: "https://lh3.googleusercontent.com/-e4hhNfadS9k/AAAAAAAAAAI/AAAAAAAAAAA/AMp5VUrPYFMwNhGK-SBkFmohwTR4RtJ99g/s96-c/photo.jpg"})
1.upto(10) do |i|
	user = User.where(username: 'user_' + i.to_s).first
	Lecture.create({user_id: user.id, title: 'lecture_' + i.to_s, content: 'lecture_' + i.to_s, url: 'lecture_' + i.to_s, thumbnail_url: 'lecture_' + i.to_s, duration: rand(10).to_s + ':' + rand(60).to_s})
end

