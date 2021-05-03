class Item < ApplicationRecord
    has_many :item_codes 
    belongs_to :product
end
