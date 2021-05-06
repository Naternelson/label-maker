
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
const nav = document.querySelector("nav")
const aside = document.querySelector("aside")
wWidth = window.innerWidth 
wHeight = window.innerHeight

function gCol(col){
    return `${wWidth/12 * col}px`
}

// nav.style.width = gCol(2)
// aside.style.width = gCol(4)
// mainBody.style.width = gCol(6)

const productList = createEl("ul", {class: "list"}, aside)

