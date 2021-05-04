class ItemCode < ApplicationRecord
    belongs_to :item_code_parameter
    belongs_to :item

    validate :matching_parameters, :match_expression
    # validates :item_value, format: {
    #         with: -> (val) {match_expression(val)}, 
    #         message: "must match format"},
    #     if: -> {!!item_code_parameter.regex }

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

    def match_expression
        unless !item_code_parameter.regex || item_code_parameter.regex == ""
            unless Regexp.new(item_code_parameter.regex).match(item_value)
                errors.add(:item_code_parameter, "must match expression")
            end
        end
    end

end
