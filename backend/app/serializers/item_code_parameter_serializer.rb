class ItemCodeParameterSerializer
  include FastJsonapi::ObjectSerializer
  attributes :name, :regex, :unique, :presence
  has_many :products
end
