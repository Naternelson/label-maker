class ItemCodeParameter < ApplicationRecord
    has_many :item_codes
    has_many :product_item_parameters
    has_many :products, through: :product_item_parameters
end
