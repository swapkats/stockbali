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

ActiveRecord::Schema.define(version: 20170716090517) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "channels", force: :cascade do |t|
    t.string   "name",                         null: false
    t.string   "description"
    t.boolean  "private",      default: false
    t.datetime "created_at",                   null: false
    t.datetime "updated_at",                   null: false
    t.string   "display_name"
    t.index ["name"], name: "index_channels_on_name", unique: true, using: :btree
  end

  create_table "emoticons", force: :cascade do |t|
    t.integer  "user_id",    null: false
    t.integer  "message_id", null: false
    t.string   "icon",       null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["user_id", "message_id", "icon"], name: "index_emoticons_on_user_id_and_message_id_and_icon", unique: true, using: :btree
  end

  create_table "messages", force: :cascade do |t|
    t.text     "content"
    t.string   "content_type", default: "regular"
    t.integer  "user_id",                          null: false
    t.integer  "channel_id",                       null: false
    t.datetime "created_at",                       null: false
    t.datetime "updated_at",                       null: false
    t.index ["channel_id"], name: "index_messages_on_channel_id", using: :btree
    t.index ["user_id"], name: "index_messages_on_user_id", using: :btree
  end

  create_table "stocks", force: :cascade do |t|
    t.string   "symbol"
    t.string   "company"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "subscriptions", force: :cascade do |t|
    t.integer  "user_id",    null: false
    t.integer  "channel_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["channel_id"], name: "index_subscriptions_on_channel_id", using: :btree
    t.index ["user_id", "channel_id"], name: "index_subscriptions_on_user_id_and_channel_id", unique: true, using: :btree
    t.index ["user_id"], name: "index_subscriptions_on_user_id", using: :btree
  end

  create_table "users", force: :cascade do |t|
    t.string   "username",            null: false
    t.string   "email",               null: false
    t.string   "photo_url"
    t.string   "password_digest"
    t.string   "session_token"
    t.datetime "created_at",          null: false
    t.datetime "updated_at",          null: false
    t.integer  "current_channel"
    t.string   "avatar_file_name"
    t.string   "avatar_content_type"
    t.integer  "avatar_file_size"
    t.datetime "avatar_updated_at"
    t.index ["username"], name: "index_users_on_username", unique: true, using: :btree
  end

end
