import { Router } from "express";
import ProductManager from "../ProductManager.js";
import { uploader } from "../config/multer.js"

const productsRouter = Router();
const pManager = new ProductManager("products");

productsRouter.get("/", async (req, res) => {
    try {
        const { limit } = req.query;
        const products = await pManager.getProducts();
        const _payload = limit ? products.splice(0, limit) : products
        res.send({ status: "success", payload: _payload });
    } catch (e) {
        res.status(500).send({ status: "error while getting products", error: e });
    }

});

productsRouter.get("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        res.send(await pManager.getProductById(id));
    } catch (e) {
        res.status(500).send({ status: `error while getting product with id: ${id}`, error: e });
    }

});

productsRouter.post("/", uploader.array("thumbnails"), async (req, res) => {
    try {
        const product = req.body;
        if (!product.title || !product.description || !product.code || !product.price || !product.stock || !product.category) {
            res.status(400).send({ status: "error", error: "missing data" });
        } else {
            // if (product.status) product.status = (product.status.toLowerCase() === "true"); // Parse string to boolean.
            if (req.files) {
                product.thumbnails = [];
                req.files.forEach(file => product.thumbnails.push(file.path));
            }
            res.send(await pManager.addProduct(product));
        }
    } catch (e) {
        res.status(500).send({ status: "error while adding new product", error: e });
    }
});

productsRouter.put("/:id", uploader.array("thumbnails"), async (req, res) => {
    try {
        const { id } = req.params;
        const product = req.body;
        if (req.files) {
            product.thumbnails = [];
            req.files.forEach(file => product.thumbnails.push(file.path));
        }
        res.send(await pManager.updateProduct(id, product));

    } catch (e) {
        res.status(500).send({ status: "error", error: e })
    }
});

productsRouter.delete("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        res.send(await pManager.deleteProduct(id));
    } catch (e) {
        res.status(500).send({ status: "error", error: e })
    }
});

export default productsRouter;