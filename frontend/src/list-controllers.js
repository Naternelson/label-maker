class ProductList extends ListTemplate{
    constructor(parent, ids){
        super(parent)
        for(let id of ids) {this.addItem(id)}
    }
    addItem(id){
        const listItem = new ProductListItem(this, id)
        this.listItems.push(listItem)
        return listItem
    }
}

class ProductListItem extends ListItemController{
    constructor(list, id){
        super(list)
        this.product = Product.instances.find(instance=>instance.id == id)
        if(!this.product){
            
            console.error("Product with an id of", id, "not found!")
            this.list.removeItem(this)
            return
        }
        this.listItemElement.setAttribute("data-product-id", this.product.id)
        this.openBtn = createEl("button", {class: "btn"}, this.buttonGroup)
        this.openBtn.addEventListener("click", ()=>{this.feature()})
        this.openBtn.innerText = "OPEN"
        this.setTitle()
        this.setBody()
    }
    feature(){
        // 
        featureProduct(this.product)
        this.list.removeItem(this)
        
        // const main = document.querySelector("main")
        // const featureZone = findOrCreateElementById("feature", main, "div")
        // const fzBox = featureZone.getBoundingClientRect()
        // const currentBox = el.getBoundingClientRect()
        // featureZone.append(el)
    }

    setTitle(){this.title = this.product.name}
    setBody(){this.body = this.product.description}
}