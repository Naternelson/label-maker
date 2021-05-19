let productList
const main = document.querySelector("main")

async function createProductList(){

    const ul = createEl("ul", null, document.querySelector("aside"))
    const products = await Product.retrieve()
    const ids = products.map(p=>p.id)
    productList = new ProductList(ul,ids)
    createSearchBar()
    productList.name = "Products"
    requestAnimationFrame(()=>productList.animateOn())
} 


function createNewProductForm(){
    const formWrapper = createEl("div", {class: "form-wrapper"}, main)
    const formHandler = new FormBuilder(formWrapper)
    formHandler.createMainModel("product")
    const title = createEl("div", {class: "form-title"}, formHandler.form)
    title.innerText = "Create a New Product"
    formHandler.mapInput("name", {name: "name" , type: "text"})
    formHandler.mapInput("description", {name: "description", type: "text"})
    const addNewParamBtn = createEl("button", {class: "btn btn-flat", type: "button"}, formHandler.form)
    const itemParamWrapper = createEl("div", {name: "item-code-params"}, formHandler.form)
    addNewParamBtn.innerText= "Add Item Parmeters"
    addNewParamBtn.addEventListener("click", ()=>{addItemParam(formHandler, itemParamWrapper)})
    const submit = createEl("button", {type: "submit", class: "btn"}, formHandler.form)
    submit.innerText = "Add Product"
    formHandler.afterSubmission = featureProduct
}

function addItemParam(fh, parent){
    const nestedModel = fh.nestModel("itemCodeParameters", "ItemCodeParameter")
    fh.mapInput("name",{type: "text", name: "name"}, nestedModel, parent)
    fh.mapInput("regex",{type: "text", name: "regex"}, nestedModel, parent)
    createEl("hr",null, parent)
}

function featureProduct(product){
    main.innerHTML = ""
    const wrapper = createEl("div", {class: "show"}, main)
    const titleCard = createEl("div", {class: "title-show"}, wrapper)
    const title = createEl("h1", null, titleCard)
    title.innerText = toTitleCase(product.name)
    const paramCount = createEl("div", {class: "title-tag"}, titleCard)
    paramCount.innerText = product.itemCodeParameters.length.toString() + " Item Code Parameters"
    const buttonGroup = createEl("div", {class: "button-group"}, wrapper)
    const closeBtn = createEl("button", {class: "btn btn-flat", type: "button"}, buttonGroup)
    closeBtn.innerText = "CLOSE"
    closeBtn.addEventListener("click", ()=>{closeProduct(product)})
    const deleteBtn = createEl("button", {class: "btn btn-flat", type: "button"}, buttonGroup)
    deleteBtn.innerText = "DELETE"
    deleteBtn.addEventListener("click", ()=>{deleteProduct(product)})
    createItemForm(product, wrapper)
    // populateItemTable(product, wrapper)
}

function closeProduct(product){
    productList.addItem(product.id)
    productList.animateOn()
    main.innerHTML = ""
    createNewProductForm()
}

async function deleteProduct(product){
    const res = await product.destroy()
    main.innerHTML = ""
    createNewProductForm()
}

function createItemForm(product, wrapper){
    const formWrapper = createEl("div", {class: "form-wrapper"}, wrapper)
    const formHandler = new FormBuilder(formWrapper)
    formHandler.createMainModel("item")
    const nestedModel = {modelProperty: 'product', type: 'product', instance: product, attributes: []}
    formHandler.included.push(nestedModel)
    const title = createEl("div", {class: "form-title"}, formHandler.form)
    title.innerText = "Add Item"
    const parent = createEl("div", {name: "item-codes"}, formHandler.form)
    for(let param of product.itemCodeParameters){
        const nestedModel = formHandler.nestModel("itemCodes", "ItemCode")
        nestedModel.instance.itemCodeParameterId = param.id
        formHandler.mapInput("itemValue",{type: "text", name: param.name, pattern: param.regex, "data-item-code-paramater-id": param.id}, nestedModel, parent)
    }
    const submit = createEl("button", {type: "submit", class: "btn"}, formHandler.form)
    submit.innerText = "Add Item"
    formHandler.afterSubmission = addItem
    createEl("hr",null, wrapper)
    createEl("div", {class:"table"}, wrapper )
}

function addItem(item){
    debugger
    document.querySelector("form").reset()
    const table = document.querySelector(".table")
    const tr = createEl("div", null, table)
    for(let code of item.itemCodes){
        const codeContent = createEl("div", null, tr)
        code.innerText = code.itemCodeParameter.name + ": " + code["item_value"]
    }
}
function populateItemTable(product){
    const table = createEl("div", {class: "table"}, document.querySelector(".show"))
    for(let item of product.items) addItem(item)

}
createProductList()
createNewProductForm()