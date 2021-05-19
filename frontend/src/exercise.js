const createSearchBar = () => {
    const header = document.querySelector(".header-bar")
    const searchbar = createEl("div", {class: "search-bar"}, header)
    const searchInput = createEl("input", {type: "search", id: "product-search", placeholder: "Search..."}, searchbar)
    searchInput.addEventListener("search", searchProducts)
}

function searchProducts(){
    const value = document.getElementById("product-search").value.toLowerCase()
    const products = Product.instances
    const productsToShow = value == "" ? products : products.filter(p => p.name.toLowerCase().match("(" + value + ")"))
    productList.removeItem()
    for(let p of productsToShow){
        productList.addItem(p.id)
    }
    productList.animateOn()
}