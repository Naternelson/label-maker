class ItemSerializer
  include FastJsonapi::ObjectSerializer
  set_key_transform :camelLower
  attributes 
  belongs_to :product 
  has_many :item_codes
end
