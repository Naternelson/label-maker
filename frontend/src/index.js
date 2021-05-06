
async function populateProductList(){
    const products = await Product.retrieve()
    productList.innerHTML = ""
    for(let product of products){
        const currentLi = createEl("li", {"data_id": product.id, class: "pre-animate"}, productList)
        const header = createEl("div", {class: "list-header"}, currentLi)
        const title = createEl("div", {class: "title"}, header)
        title.innerText = product.product_name
        const buttonGroup = createEl("div", {class: "list-btns"}, header)
        const deleteBtn = createEl("button", {class: "btn"}, buttonGroup)
        deleteBtn.innerText = "OPEN"
        const body = createEl("div", {class: "list-body hidden"}, currentLi)
        const description = createEl("div", {class: "list-body-text"}, body)
        description.innerText = product.description
        setTimeout(()=>{currentLi.classList.remove("pre-animate")})
        currentLi.addEventListener("click", (e)=>{
            const body = e.currentTarget.querySelector(".list-body")
            const isHidden = body.classList.contains("hidden")
            isHidden ? body.classList.remove("hidden") : body.classList.add("hidden")
        })
    }
}

populateProductList()//Will get a promise and then wait for the rest of the stack to clear before executing
const mainBody = document.querySelector("main")
const productList = createEl("ul", {class: "list"}, mainBody)

