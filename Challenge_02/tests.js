import { ProductManager } from "./ProductManager.js";

//* Tests
const p1 = new ProductManager('./products.json');
console.log("Lista de productos: ", await p1.getProducts());
// p1.path = "./test.js";
// console.log("Lista de productos: ", await p1.getProducts());
const product = {
    title: "hola",
    description: "mundo",
    price: 1,
    thumbnail: "url",
    code: Math.floor(Math.random() * 1000),
    // code: 1,
    stock: 10
}
await p1.addProduct(product);
console.log("Lista de productos: ", await p1.getProducts());
// p1.path = "./test.js";
console.log("Product_15: ", await p1.getProductById(15));

const data = {
    //title: "mundo",
    //description: "hola",
    price: 99999,
    //thumbnail: "url",
    //code: Math.floor(Math.random() * 1000),
    stock: 0
}

await p1.updateProduct(1, data);
console.log("Product_1: ", await p1.getProductById(1));

await p1.deleteProduct(1);
console.log("Product_1: ", await p1.getProductById(1));
