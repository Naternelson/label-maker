class Item < ApplicationRecord
    has_many :item_codes 
    belongs_to :product

    accepts_nested_attributes_for :item_codes
end
