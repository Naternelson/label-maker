class ItemCode < ApplicationRecord
    belongs_to :item_code_parameter
    belongs_to :item
    validate :
    validates :item_code_parameter, uniqueness: {
        scope: :item, message: "code already taken" 
    }, if: -> {item.product.has_item_params?}

    def matching_parameters
        if item.product.has_item_params?  
            unless item_code_parameter.products.include?(item.product)
                errors.add(:item_code_parameter, "must include valid parameters")
            end
        end
    end
end
