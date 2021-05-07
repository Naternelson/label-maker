class Product extends Model{
    static resource = "products/"
    static instances = []
}
modelProperties(Product,["product_name", "description"])

class Item extends Model{
    static resource = "items/"
    static instances = []
}

