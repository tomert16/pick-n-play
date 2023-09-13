class Sport < ApplicationRecord
    has_many :meet_ups
    belongs_to :location
end
