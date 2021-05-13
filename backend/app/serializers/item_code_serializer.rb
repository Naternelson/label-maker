class ItemCodeSerializer
  include FastJsonapi::ObjectSerializer
  set_key_transform :camelLower
  attributes :item_value, :item_code_parameter_id
  belongs_to :item_code_parameter
end
