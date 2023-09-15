class SportSerializer < ActiveModel::Serializer
  attributes :id, :sport_type, :img_url, :bg_img, :total_players
  has_many :meet_ups

end
