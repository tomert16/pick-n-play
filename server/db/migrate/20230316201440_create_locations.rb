class CreateLocations < ActiveRecord::Migration[7.0]
  def change
    create_table :locations do |t|
      t.string :state
      t.string :img_url

      t.timestamps
    end
  end
end
