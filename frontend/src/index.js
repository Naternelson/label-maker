// Product.retrieve()
async function createProductList(){
    const ul = createEl("ul", null, document.querySelector("aside"))
    const products = await Product.retrieve()
    const ids = products.map(p=>p.id)
    const productList = new ProductList(ul,ids)
    productList.name = "Products"
    requestAnimationFrame(()=>productList.animateOn())
} 


function createProductForm(){
    const main = document.querySelector("main")
    const formWrapper = createEl("div", {class: "form-wrapper"}, main)
    const productForm = createEl("form", null, formWrapper)
    const nameLabel = createEl("label", {for: "name"}, productForm)
    nameLabel.innerText = "Name"
    const nameInput = createEl("input", {type: "text", name: "name"}, productForm)
    const descriptionLabel = createEl("label", {for: "description"}, productForm)
    descriptionLabel.innerText = "Description"
    const descriptionInput = createEl("input", {type: "text", name: "description"}, productForm)
    const submitBtn = createEl("button", {class: "btn"}, productForm)
    submitBtn.innerText = "Submit"
    submitBtn.addEventListener("click", (e)=>{newProductHandler(e)})
}

async function newProductHandler(e){
    e.preventDefault()
    const inputs = e.target.form.querySelectorAll("input")
    const attributes = {}
    inputs.forEach(input=>{ 
        debugger
        attributes[input.name] = input.value})
    const product = new Product({attributes})
    await product.post()
    alert("Product arrived!")
}

createProductList()
createProductForm()