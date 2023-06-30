import fs from "fs";

export default class ProductManager {

    constructor(path) {
        this._path = path;
        fs.writeFile(path, JSON.stringify([]), { flag: "wx" }, (error) => {
            if (error) {
                console.log(`Opening file ${path}.`);
            } else {
                console.log(`Creating a new file at ${path}.`);
            }
        });
    }

    /**
     * @param {string} path
     */
    set path(path) {
        this._path = path;
    }

    #getProductsFromFile = async () => {
        return JSON.parse(await fs.promises.readFile(this._path, "utf-8"));
    }

    #setProductsToFile = async (products) => {
        await fs.promises.writeFile(this._path, JSON.stringify(products));
    }

    /**
     * Adds a new product to file.
     * @param { { title: string, description: string, price: integer, thumbnail, code: integer, stock: integer } } param0 
     */
    addProduct = async ({ title, description, price, thumbnail, code, stock }) => {
        try {
            const products = await this.#getProductsFromFile();
            if (!products.find(product => product.code == code)) {
                const newProduct = {
                    id: products.length == 0 ? 1 : products[products.length - 1].id + 1,
                    title,
                    description,
                    price,
                    thumbnail,
                    code,
                    stock
                };

                products.push(newProduct);
                await this.#setProductsToFile(products);
            } else {
                console.log(`Failed adding product. Code ${code} already exists.`);
            }
        } catch (error) {
            console.error(error);
        }
    }

    /**
     * 
     * @returns an array of objects with all products
     */
    getProducts = async () => {
        try {
            return await this.#getProductsFromFile();
        } catch (error) {
            console.error(error);
        }
    }

    /**
     * 
     * @param {integer} id 
     * @returns an object with the requested product details
     */
    getProductById = async (id) => {
        try {
            const products = await this.#getProductsFromFile();
            const product = products.find(product => product.id == id);
            return product ? product : { error: "Not found" };
        } catch (error) {
            console.error(error);
        }
    }

    /**
     * Updates the details of the specified product
     * @param {integer} id
     * @param { { title: string, description: string, price: integer, thumbnail, code: integer, stock: integer } } data
     */
    updateProduct = async (id, data) => {
        try {
            const products = await this.#getProductsFromFile();
            const prodIdx = products.findIndex(product => product.id == id);
            if (prodIdx != -1) {
                for (const [key, value] of Object.entries(data)) {
                    products[prodIdx][key] = value;
                }
                await this.#setProductsToFile(products);
                console.log(`Product ${id} updated.`)

            } else {
                console.log(`There is no such product with id ${id}.`);
            }
        } catch (error) {
            console.error(error);
        }
    }

    /**
     * 
     * @param {integer} id 
     */
    deleteProduct = async (id) => {
        try {
            const products = await this.#getProductsFromFile();
            const prodIdx = products.findIndex(product => product.id == id);
            if (prodIdx != -1) {
                products.splice(prodIdx, 1);
                await this.#setProductsToFile(products);
                console.log(`Product ${id} deleted.`)
            } else {
                console.log(`There is no such product with id ${id}.`);
            }
        } catch (error) {
            console.error(error);
        }
    }
}