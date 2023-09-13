class SportWithMeetupsSerializer < ActiveModel::Serializer
  attributes :id, :sport_type, :bg_img

  has_many :meet_ups
end
