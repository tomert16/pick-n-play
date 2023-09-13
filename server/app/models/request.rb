class Request < ApplicationRecord
  belongs_to :player

  validates :name, {uniqueness: true, presence: true}
  validates :location, presence: true
end
