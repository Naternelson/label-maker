class ListTemplate{
    constructor(parentWrapper){
        this.wrapper = parentWrapper
        this.innerHTML = ""
        this.listHeader = createEl("div", {class: "header-bar"}, this.wrapper)
        this.listName = createEl("h2", null, this.listHeader)
        this.name = "BoilerPlate"
        this.listItems = []   
    }
    addToHeader(el){
        this.listHeader.append(el)
    }
    addItem(id, attributes){
        const listItem = new ListItemController(this, id)
        for(let a in attributes){listItem[a] = attributes[a]}
        this.listItems.push(listItem)
        return listItem
    }
    removeItem(item){
        const index = this.listItems.indexOf(item)
        if (index > -1){
            item.animateOff()
            this.listItems.splice(index,1)
            // debugger
            item.listItemElement.remove()
        }
    }
    animateOn(){
        for(let i of this.listItems){i.animateOn()}
    }
    set name(x){
        this.listName.innerText = x
    }
    get name(){
        this.listName.innerText
    }
}

class ListItemController{
    constructor(list){
        this.list = list 
        this.listItemElement = createEl("li", { class: "pre-animate list-item"}, this.list.wrapper)
        this.headerElement = createEl("div", {class: "list-header"}, this.listItemElement)
        this.titleElement = createEl("div", {class: "title"}, this.headerElement)
        this.buttonGroup = createEl("div", {class: "list-btns"}, this.headerElement)
        this.bodyElement = createEl("div", {class: "list-body hidden"}, this.listItemElement)
        this.bodyText = createEl("div", {class: "list-body-text"}, this.bodyElement)
        this.listItemElement.addEventListener("mouseenter", ()=>requestAnimationFrame(this.accordianOn.bind(this)))
        this.listItemElement.addEventListener("mouseleave", ()=>requestAnimationFrame(this.accordianOff.bind(this)))
    }
    animateOn(){
        requestAnimationFrame(()=>this.listItemElement.classList.remove("pre-animate"))
    }
    animateOff(){
        this.listItemElement.classList.add("animate-off")
    }
    accordianOn(){
        this.listItemElement.style.padding = "28px 20px"
        this.bodyElement.classList.remove("hidden")
    }
    accordianOff(){
        this.listItemElement.style.removeProperty("padding")
        this.bodyElement.classList.add("hidden")
    }
    set body(x){
        this.bodyElement.innerText = x
    }
    get body(){
        this.bodyElement.innerText
    }
    set title(x){
        this.titleElement.innerText = x
    }
    get title(){
        this.titleElement.innerText
    }
}