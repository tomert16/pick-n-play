class AddMeetUpToSport < ActiveRecord::Migration[7.0]
  def change
    add_column :meet_ups, :sport_id, :integer
  end
end
