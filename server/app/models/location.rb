class Location < ApplicationRecord
    has_many :sports
    has_many :fields
end
