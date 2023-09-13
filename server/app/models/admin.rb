class Admin < ApplicationRecord
    has_secure_password

    validates :email, {uniqueness: true, presence: true}
    validates :password_digest, {presence: true, length: {minimum: 5}}
    validates :name, presence: true
end
