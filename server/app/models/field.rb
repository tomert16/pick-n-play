class Field < ApplicationRecord
    has_many :meet_ups, dependent: :destroy
    has_many :sports, through: :meet_ups
    belongs_to :location
end
