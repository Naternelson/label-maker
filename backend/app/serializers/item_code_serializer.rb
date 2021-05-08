class ItemCodeSerializer
  include FastJsonapi::ObjectSerializer
  set_key_transform :camelLower
  attributes :item_value
  belongs_to :item_code_parameter
end
