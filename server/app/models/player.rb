class Player < ApplicationRecord
    has_secure_password
    has_many :meet_ups
    has_many :player_meet_ups
    has_many :requests, dependent: :destroy
    
    validates :email, {uniqueness: true, presence: true}
    validates :password_digest, {presence: true, length: {minimum: 5}}
    validates :first_name, :last_name, presence: true
end
