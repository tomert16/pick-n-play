class PlayerSerializer < ActiveModel::Serializer
  attributes :id, :first_name, :last_name, :email, :location

  # def name
  #   "#{object.first_name} #{object.last_name}"
  # end
end
