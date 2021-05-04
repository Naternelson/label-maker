require 'rails_helper'

RSpec.describe ItemCode, :type => :model do
    ItemCodeParameter.delete_all
    ItemCode.delete_all
    Item.delete_all
    ProductItemParameter.delete_all
    Product.delete_all
    @@main_product = Product.create(name: "Demonstration", description: "A Dummy Product")
    @@param_one = @@main_product.item_code_parameters.create(regex: '^\d{9}$', unique: true, presence: true, name: "UDI")
    @@param_two = @@main_product.item_code_parameters.create(regex: '^\w{6}$', unique: true, presence: true, name: "Device ID")
    
  it "is valid with valid attributes" do 
    @item = @@main_product.items.create()
    @target_item_code = @item.item_codes.build(item_code_parameter: @@param_one, item_value: "123456789")
    expect(@target_item_code).to be_valid
  end
  @@secondary_product = Product.create(name: "Ternary Product", description: "Second Product")
  @@param_three = @@secondary_product.item_code_parameters.create(regex: '^\w+$', unique: true, presence: true, name: "Some Unique Code")
  @@param_four = @@secondary_product.item_code_parameters.create(name: "Optional Data")

  it "is not valid with item_code_parameter that is not found in current product's item requriments" do
    @item = @@main_product.items.create()
    @target_item_code = @item.item_codes.build(item_code_parameter: @@param_three, item_value: "123456789")
    expect(@target_item_code).to_not be_valid
  end
  it "is not valid without matching the Regular Expression" do 
    @item = @@main_product.items.create()
    @target_item_code = @item.item_codes.build(item_code_parameter: @@param_one, item_value: "12345678")
    expect(@target_item_code).to_not be_valid
    @target_item_code.item_value = "A23456789"
    expect(@target_item_code).to_not be_valid
    @target_item_code.item_value = "123456789"
    expect(@target_item_code).to be_valid
  end
  it "is not valid if the item value is duplicated" do 
    @item = @@main_product.items.create()
    @item_code = @item.item_codes.create(item_code_parameter: @@param_one, item_value: "123456789")
    @second_item = @item = @@main_product.items.create()
    @target_item_code = @item.item_codes.build(item_code_parameter: @@param_one, item_value: "123456789")
    expect(@target_item_code).to_not be_valid
  end
  it "is not valid if the item_code_parameter is duplicated on the item" do 
    @item = @@main_product.items.create()
    @item_code = @item.item_codes.create(item_code_parameter: @@param_two, item_value: "123456")
    @target_item_code = @item.item_codes.build(item_code_parameter: @@param_two, item_value: "234567")
    expect(@target_item_code).to_not be_valid
  end
end