class ProductManager {
    
    constructor () {
        this.product = [];
    }

    addProduct = (title, description, price, thumbnail, code, stock) => {
    
        if(!this.product.find( prod => prod.code == code )) {
            const newProduct = {
                id: this.product.length + 1,
                title,
                description,
                price,
                thumbnail,
                code,
                stock
            };

             this.product.push(newProduct);    
        } else
            console.log(`ERROR: Product with code ${code} already exists.`);

    }

    getProducts = () => this.product;
    
    getProductById = (id) => {
        const productById = this.product.find( prod => prod.id == id );
        return  productById ? productById : "Not found";
    }

}

// Test
const p1 = new ProductManager;
console.log("Lista de productos: ", p1.getProducts());
p1.addProduct("hola", "mundo", 1, "url", 5, 1);
console.log("Lista de productos: ", p1.getProducts());
p1.addProduct("hola", "mundo", 1, "url", 5, 1);
console.log(p1.getProductById(1));
console.log(p1.getProductById(2));
