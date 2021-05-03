class ItemCode < ApplicationRecord
    belongs_to :item_code_parameter
    belongs_to :item

    validate :matching_parameters
    binding.pry
    validates :item_value, format: {
            with: -> {Regexp.new(item_code_parameter.regex)}, 
            message: "must match format"},
        if: -> {!!item_code_parameter.regex }
        
    validates :item_value, presence: true, if: -> {item_code_parameter.presence}
    validates :item_value, uniqueness: true, if: -> {item_code_parameter.unique}

    validates :item_code_parameter, uniqueness: {
        scope: :item, message: "already taken" 
    }, if: -> {item.product.has_item_params?}

    def matching_parameters
        if item.product.has_item_params?  
            unless item_code_parameter.products.include?(item.product)
                errors.add(:item_code_parameter, "must include valid parameters")
            end
        end
    end
end
