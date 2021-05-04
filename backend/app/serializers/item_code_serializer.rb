class ItemCodeSerializer
  include FastJsonapi::ObjectSerializer
  attributes :item_value
  belongs_to :item_code_parameter
end
