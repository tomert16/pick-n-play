class RequestSerializer < ActiveModel::Serializer
  attributes :id, :name, :location, :likes, :dislikes
  has_one :player

  def player
    {
      "id": object.player.id,
      "name": "#{object.player.first_name} #{object.player.last_name}"
    }
  end
end
