class RenameProductName < ActiveRecord::Migration[6.1]
  def change
    rename_column :products, :name, :product_name
  end
end
