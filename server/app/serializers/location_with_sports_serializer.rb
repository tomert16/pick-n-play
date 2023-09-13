class LocationWithSportsSerializer < ActiveModel::Serializer
  attributes :id, :state

  has_many :sports
  has_many :fields
end
