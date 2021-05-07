// Product.retrieve()
async function createProductList(){
    const ul = createEl("ul", null, document.querySelector("aside"))
    const products = await Product.retrieve()
    const ids = products.map(p=>p.id)
    const productList = new ProductList(ul,ids)
    productList.name = "Products"
    requestAnimationFrame(()=>productList.animateOn())
} 

createProductList()