class ItemCodeParameter < ApplicationRecord
    has_many :item_codes
    has_many :product_item_parameters
    has_many :products, through: :product_item_parameters

    validate :vaid_regex?

    def vaild_regex
        if regex 
            Regexp.new(regex)
            true
        rescue
            false
        else
            true
        end
    end
end
