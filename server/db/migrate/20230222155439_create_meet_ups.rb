class CreateMeetUps < ActiveRecord::Migration[7.0]
  def change
    create_table :meet_ups do |t|
      t.belongs_to :player, null: false, foreign_key: true
      t.belongs_to :field, null: false, foreign_key: true
      t.datetime :date
      t.float :longitude
      t.float :latitude

      t.timestamps
    end
  end
end
