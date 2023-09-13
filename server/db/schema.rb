# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema[7.0].define(version: 2023_09_07_193925) do
  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "admins", force: :cascade do |t|
    t.string "name"
    t.string "email"
    t.string "password_digest"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "fields", force: :cascade do |t|
    t.string "field_name"
    t.string "img_url"
    t.integer "location_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "locations", force: :cascade do |t|
    t.string "state"
    t.string "img_url"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "meet_ups", force: :cascade do |t|
    t.bigint "player_id", null: false
    t.bigint "field_id", null: false
    t.datetime "date"
    t.float "longitude"
    t.float "latitude"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer "sport_id"
    t.index ["field_id"], name: "index_meet_ups_on_field_id"
    t.index ["player_id"], name: "index_meet_ups_on_player_id"
  end

  create_table "player_meet_ups", force: :cascade do |t|
    t.bigint "player_id", null: false
    t.bigint "meet_up_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["meet_up_id"], name: "index_player_meet_ups_on_meet_up_id"
    t.index ["player_id"], name: "index_player_meet_ups_on_player_id"
  end

  create_table "players", force: :cascade do |t|
    t.string "first_name", null: false
    t.string "last_name", null: false
    t.string "email"
    t.string "password_digest"
    t.json "location"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "requests", force: :cascade do |t|
    t.string "name"
    t.string "location"
    t.integer "likes", default: 0
    t.integer "dislikes", default: 0
    t.bigint "player_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["player_id"], name: "index_requests_on_player_id"
  end

  create_table "sports", force: :cascade do |t|
    t.string "sport_type"
    t.string "img_url"
    t.string "bg_img"
    t.integer "location_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  add_foreign_key "meet_ups", "fields"
  add_foreign_key "meet_ups", "players"
  add_foreign_key "player_meet_ups", "meet_ups"
  add_foreign_key "player_meet_ups", "players"
  add_foreign_key "requests", "players"
end
