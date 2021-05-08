class ProductSerializer
  include FastJsonapi::ObjectSerializer
  set_key_transform :camelLower
  attributes :name, :description
  has_many :item_code_parameters
  has_many :items
end
