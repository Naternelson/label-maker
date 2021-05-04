// fetch("http://localhost:3000/products").then(res=> res.json()).then(res=>console.log(res)).catch(res=>console.log(res))

async function getProducts(){
    await Product.retrieveIndex()
    console.log(Product.instances)
    Product.instances[0].name = "A Test"
    console.log(Product.instances[0])
}

getProducts()