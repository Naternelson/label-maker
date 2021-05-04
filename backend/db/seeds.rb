mainProduct = Product.create(name: "Dummy Product", description: "This product should test all of its model associations")

paramOne = mainProduct.item_code_parameters.find_or_create_by(regex: '\A\d{9}\z', unique: true, presence: true, name: "UDI")
paramTwo = mainProduct.item_code_parameters.find_or_create_by(regex: '\A\w{6}\z', unique: true, presence: true, name: "Device ID")

itemOne = mainProduct.items.create()
itemOneValueOne = itemOne.item_codes.find_or_create_by(item_code_parameter: paramOne, item_value: "123456789")
itemOneValueTwo = itemOne.item_codes.find_or_create_by(item_code_parameter: paramTwo, item_value: "123456")

itemTwo = mainProduct.items.create()
itemTwoValueOne = itemTwo.item_codes.find_or_create_by(item_code_parameter: paramOne, item_value: "234567890")
itemTwoValueTwo = itemTwo.item_codes.find_or_create_by(item_code_parameter: paramTwo, item_value: "234567")

itemThree = mainProduct.items.create()
itemThreeValueOne = itemThree.item_codes.find_or_create_by(item_code_parameter: paramOne, item_value: "345678901")
itemThreeValueTwo = itemThree.item_codes.find_or_create_by(item_code_parameter: paramTwo, item_value: "345678")

ternaryProduct =  Product.create(name: "Secondary Product", description: "This product should be able to add params and items")
puts "Complete"