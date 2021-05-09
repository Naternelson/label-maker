// Product.retrieve()
async function createProductList(){
    const ul = createEl("ul", null, document.querySelector("aside"))
    const products = await Product.retrieve()
    const ids = products.map(p=>p.id)
    const productList = new ProductList(ul,ids)
    productList.name = "Products"
    requestAnimationFrame(()=>productList.animateOn())
} 

// function createNewProductForm(){
//     const main = document.querySelector("main")
//     const formWrapper = createEl("div", {class: "form-wrapper"}, main)
//     const form = new FormBuilder(formWrapper)
//     form.createInput("text", "name", {"data-model": "Product"})
//         .createInput("text", "description", {"data-model": "Product"})
//         .createTitle("Create A New Product")
//     const newItemCodeParam = form.createBtn(null, "Add Item Code", {class: "btn btn-flat"})
//     form.createBtn(null, "Submit", {class: "btn"})
//     form.display()
// }


// async function newProductHandler(e){
//     e.preventDefault()
//     const inputs = e.target.form.querySelectorAll("input")
//     const attributes = {}
//     inputs.forEach(input=>{ 
//         attributes[input.name] = input.value})
//     const product = new Product({attributes})
//     await product.post()
//     alert("Product arrived!")
// }

// function nestForm(formElement, model, ...attributes){

// }

const main = document.querySelector("main")
const formWrapper = createEl("div", {class: "form-wrapper"}, main)
function createNewProductForm(){
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
}

function addItemParam(fh, parent){
    const nestedModel = fh.nestModel("itemCodeParameters", "ItemCodeParameter")
    fh.mapInput("name",{type: "text", name: "name"}, nestedModel, parent)
    fh.mapInput("regex",{type: "text", name: "regex"}, nestedModel, parent)
    createEl("hr",null, parent)
}


createProductList()
createNewProductForm()