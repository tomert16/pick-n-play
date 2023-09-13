class CreatePlayers < ActiveRecord::Migration[7.0]
  def change
    create_table :players do |t|
      t.string :first_name, null: false
      t.string :last_name, null: false
      t.string :email
      t.string :password_digest
      t.json :location, default: nil

      t.timestamps
    end
  end

end
