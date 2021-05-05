class Product extends Model{
    static resource = "products/"
}
modelProperties(Product,["product_name", "description"])

class Item extends Model{
    static resource = "items/"
}

