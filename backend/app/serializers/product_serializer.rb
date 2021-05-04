class ProductSerializer
  include FastJsonapi::ObjectSerializer
  attributes :name, :description
  has_many :item_code_parameters
end
