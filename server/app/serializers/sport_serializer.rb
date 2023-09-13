class SportSerializer < ActiveModel::Serializer
  attributes :id, :sport_type, :img_url, :bg_img
  has_many :meet_ups

end
