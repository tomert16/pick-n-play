class LocationSerializer < ActiveModel::Serializer
  attributes :id, :state, :img_url

  has_many :sports
  has_many :fields
  
end
