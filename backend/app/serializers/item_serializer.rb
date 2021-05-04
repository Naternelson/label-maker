class ItemSerializer
  include FastJsonapi::ObjectSerializer
  attributes 
  belongs_to :product 
  has_many :item_codes
end
