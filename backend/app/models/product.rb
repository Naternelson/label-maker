class Product < ApplicationRecord
    has_many :product_item_parameters
    has_many :item_code_parameters, through: :product_item_parameters
    has_many :items, dependent: :destroy
end
