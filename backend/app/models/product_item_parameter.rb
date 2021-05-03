class ProductItemParameter < ApplicationRecord
    belongs_to :product
    belongs_to :item_code_parameter
end
