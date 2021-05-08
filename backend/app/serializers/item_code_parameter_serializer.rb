class ItemCodeParameterSerializer
  include FastJsonapi::ObjectSerializer
  set_key_transform :camelLower
  attributes :name, :regex, :unique, :presence
  has_many :products
end
