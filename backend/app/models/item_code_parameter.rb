class ItemCodeParameter < ApplicationRecord
    has_many :item_codes
    has_many :product_item_parameters
    has_many :products, through: :product_item_parameters

    validate :valid_regex?

    def valid_regex?
        if regex 
            begin
                Regexp.new(regex)
            rescue
                errors.add(:regex, "must be vaild Regular Expression Syntax")
            end
        end
    end
end
