require 'rails_helper'

RSpec.describe ItemCode, :type => :model do
  it "is valid with valid attributes"
  it "is not valid with item_code_parameter that is not found in current product's item requriments"
  it "is not valid without matching the Regular Expression"
  it "is not valid if the item value is duplicated"
  it "is not valid if the item_code_parameter is duplicated on the item"
end