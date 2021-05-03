class CreateItemParameters < ActiveRecord::Migration[6.1]
  def change
    create_table :item_codes do |t|
      t.integer :item_code_parameter_id
      t.integer :item_id 
      t.string :item_value
      t.timestamps
    end
  end
end
