class CreateItemCodeParameters < ActiveRecord::Migration[6.1]
  def change
    create_table :item_code_parameters do |t|
      t.string :regex
      t.boolean :unique
      t.boolean :presence
      t.string :name
      t.timestamps
    end
  end
end
