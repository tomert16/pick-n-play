class CreatePlayerMeetUps < ActiveRecord::Migration[7.0]
  def change
    create_table :player_meet_ups do |t|
      t.belongs_to :player, null: false, foreign_key: true
      t.belongs_to :meet_up, null: false, foreign_key: true

      t.timestamps
    end
  end
end
