class PlayerMeetUp < ApplicationRecord
  belongs_to :player
  belongs_to :meet_up
  
  # validations
  validates :player_id, uniqueness: { scope: :meet_up_id, 
    message: "You are already in this meet up"
  }
end
