class MeetUpSerializer < ActiveModel::Serializer
  attributes :id, :date, :longitude, :latitude, :field, :player, :sport, :teammates
  # belongs_to :sport
  # belongs_to :field
  # belongs_to :player


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
  def date 
    object.date.to_fs(:long)
  end
  def teammates 
      object.player_meet_ups.map {|player| {
        "id": player.player.id,
        "name": "#{player.player.first_name} #{player.player.last_name}"
        }}
  end
end
