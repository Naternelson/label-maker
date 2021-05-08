class Product extends Model{
    static resource = "products/"
    static instances = []
}
modelProperties(Product, ["name", "description"])

class Item extends Model{
    static resource = "items/"
    static instances = []
}

class ItemCodeParameter extends Model {
    static resource = "item_code_parameters/"
    static instances = []
}
modelProperties(ItemCodeParameter, ["regex", "name", "unique", "presence"])

