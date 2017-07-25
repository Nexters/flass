# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20170725082720) do

  create_table "answers", force: :cascade do |t|
    t.integer "user_id"
    t.integer "question_id"
    t.string "answer"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "choices", force: :cascade do |t|
    t.integer "question_id"
    t.string "answer"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "comments", force: :cascade do |t|
    t.integer "user_id"
    t.integer "lecture_id"
    t.string "content"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "lectures", force: :cascade do |t|
    t.integer "user_id"
    t.string "title"
    t.text "content"
    t.string "url"
    t.string "thumbnail_url"
    t.time "duration"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "notifications", force: :cascade do |t|
    t.integer "user_id"
    t.string "type"
    t.string "content"
    t.string "url"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "questions", force: :cascade do |t|
    t.integer "lecture_id"
    t.string "content"
    t.string "correct_answer"
    t.time "question_at"
    t.string "hint"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "replay_ats", force: :cascade do |t|
    t.integer "user_id"
    t.integer "lecture_id"
    t.time "playtime"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "users", force: :cascade do |t|
    t.string "username"
    t.string "email"
    t.string "myprofileurl"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

end
