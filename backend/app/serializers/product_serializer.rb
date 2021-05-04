class ProductSerializer
  include FastJsonapi::ObjectSerializer
  attributes :product_name, :description
  has_many :item_code_parameters
  has_many :items
end
