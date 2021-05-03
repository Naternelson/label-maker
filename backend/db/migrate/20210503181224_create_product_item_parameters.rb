class CreateProductItemParameters < ActiveRecord::Migration[6.1]
  def change
    create_table :product_item_parameters do |t|
      t.integer :product_id
      t.integer :item_code_parameter_id
      t.string :alias
      t.timestamps
    end
  end
end
