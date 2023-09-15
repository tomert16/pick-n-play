class SportWithMeetupsSerializer < ActiveModel::Serializer
  attributes :id, :sport_type, :bg_img, :total_players

  has_many :meet_ups
end
