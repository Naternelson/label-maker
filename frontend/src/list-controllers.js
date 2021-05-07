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
        // debugger
        const el = this.listItemElement
        const main = document.querySelector("main")
        const featureZone = findOrCreateElementById("feature", main, "div")
        const fzBox = featureZone.getBoundingClientRect()
        const currentBox = el.getBoundingClientRect()
        featureZone.append(el)
        // el.classList.add("feature-move")
        // el.style.left = currentBox.x.toString() +"px"
        // el.style.top = currentBox.y.toString()+"px"
        // document.body.append(el)
        
        // requestAnimationFrame(()=>{
        //     debugger
        //     requestAnimationFrame(()=>el.style.left = fzBox.x.toString()+"px")
        //     requestAnimationFrame(()=>el.style.top = fzBox.y.toString()+"px")
        //     requestAnimationFrame(()=>)
        //     requestAnimationFrame(()=>el.style.removeProperty("left"))
        //     requestAnimationFrame(()=>el.style.removeProperty("top"))
        //     requestAnimationFrame(()=>el.classList.remove("feature-move"))
        // })
        
    }

    setTitle(){this.title = this.product.product_name}
    setBody(){this.body = this.product.description}
}