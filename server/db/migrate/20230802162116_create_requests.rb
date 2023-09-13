class CreateRequests < ActiveRecord::Migration[7.0]
  def change
    create_table :requests do |t|
      t.string :name
      t.string :location
      t.integer :likes, default: 0
      t.integer :dislikes, default: 0
      t.references :player, null: false, foreign_key: true

      t.timestamps
    end
  end
end
