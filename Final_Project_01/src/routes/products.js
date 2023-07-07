import { Router } from "express";
import ProductManager from "../ProductManager.js";

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

export default productsRouter;