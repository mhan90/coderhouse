import express from "express";
import ProductManager from "./ProductManager.js";

const app = express();

const pManager = new ProductManager("../products.json");

app.use(express.urlencoded({ extended: true }));

app.get("/products", async (req, res) => {
    const { limit } = req.query;
    const products = await pManager.getProducts();
    res.send(limit ? products.splice(0, limit) : products);
});

app.get("/products/:id", async (req, res) => {
    const { id } = req.params;
    res.send(await pManager.getProductById(id));
});

app.listen(8080, () => {
    console.log("Server is now listening at port: 8080.");
});