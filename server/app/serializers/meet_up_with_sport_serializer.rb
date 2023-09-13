class MeetUpWithSportSerializer < ActiveModel::Serializer
  attributes :id, :date, :longitude, :latitude, :field, :player, :sport, :teammates
  has_many :player_meet_ups

  def player
    {
      "id": object.player.id,
      "name": "#{object.player.first_name} #{object.player.last_name}"
    }
  end

  def field 
    {
      "id": object.field.id,
      "name": object.field.field_name,
      "img_url": object.field.img_url
    }
  end
  def sport
    {
      "type": object.sport.sport_type,
      "image": object.sport.img_url
    }
  end

  def teammates 
      object.player_meet_ups.map {|player| {
        "id": player.player.id,
        "name": player.player.first_name + " " + player.player.last_name
      }
    }
  end
  def date 
    object.date.to_fs(:long)
  end

end
