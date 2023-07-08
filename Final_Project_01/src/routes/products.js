import { Router } from "express";
import ProductManager from "../ProductManager.js";
import { uploader } from "../config/multer.js"

const productsRouter = Router();
const pManager = new ProductManager("products");

productsRouter.get("/", async (req, res) => {
    try {
        const { limit } = req.query;
        const products = await pManager.getProducts();
        res.send(limit ? products.splice(0, limit) : products);
    } catch (e) {
        res.status(500).send({ error: "Error while getting all products." });
    }

});

productsRouter.get("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        res.send(await pManager.getProductById(id));
    } catch (e) {
        res.status(500).send({ error: `Error while getting product with id ${id}.` });
    }

});

productsRouter.post("/", uploader.single("thumbnail"), async (req, res) => {
    const product = req.body;
    if (!product.title || !product.description || !product.code || !product.price || !product.stock || !product.category) {
        res.send({ error: "Product data missing." });
    } else {
        if (req.file) product.thumbnail = req.file.filename;
        console.log(product);
        try {
            res.send(await pManager.addProduct(product));
        } catch (e) {
            res.status(500).send({ error: "Error while adding new product" });
        }
    }

});

export default productsRouter;