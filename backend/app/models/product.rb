class Product < ApplicationRecord
    has_many :product_item_parameters
    has_many :item_code_parameters, through: :product_item_parameters
    has_many :items, dependent: :destroy
    
    validates :name, presence: :true
    accepts_nested_attributes_for :item_code_parameters

    def has_item_params?
        item_code_parameters.length > 0
    end
end
