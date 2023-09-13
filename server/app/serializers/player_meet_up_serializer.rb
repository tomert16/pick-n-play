class PlayerMeetUpSerializer < ActiveModel::Serializer
  attributes :id, :player, :field, :date, :sport, :host
  belongs_to :player
  belongs_to :meet_up, serializer: MeetUpSerializer

  def player
    {
      "id": object.player.id,
      "name": "#{object.player.first_name} #{object.player.last_name}"
    }
  end
  def field
  {"name": object.meet_up.field.field_name}
  end 
  
  def date
    object.meet_up.date.to_fs(:long)
  end

  def sport
    object.meet_up.sport.sport_type
  end

  def host
   "#{object.meet_up.player.first_name} #{object.meet_up.player.last_name}"
  end

end
