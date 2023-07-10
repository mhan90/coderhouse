import { Router } from "express";
import CartManager from "../CartManager.js";

const cartsRouter = Router();
const cManager = new CartManager("carts", "./db/products.json");

cartsRouter.get("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        res.send(await cManager.getCart(id));
    } catch (e) {
        res.status(500).send({ status: `error while getting cart with id: ${id}`, error: e });
    }
});

cartsRouter.post("/", async (req, res) => {
    try {
        res.send(await cManager.addCart());
    } catch (e) {
        res.status(500).send({ status: "error while adding new cart", error: e });
    }
});

cartsRouter.post("/:cid/product/:pid", async (req, res) => {
    try {
        const { cid, pid } = req.params;
        res.send(await cManager.addProductToCart(cid, pid));
    } catch (e) {
        res.status(500).send({ status: "error while adding product to cart", error: e });
    }
});

cartsRouter.delete("/:cid", async (req, res) => {
    try {
        const { cid } = req.params;
        res.send(await cManager.deleteCart(cid));
    } catch (e) {
        res.status(500).send({ status: "error while deleting cart", error: e });
    }
});

cartsRouter.delete("/:cid/product/:pid", async (req, res) => {
    try {
        const { cid, pid } = req.params;
        res.send(await cManager.deleteProductFromCart(cid, pid));
    } catch (e) {
        res.status(500).send({ status: "error while deleting product from cart", error: e });
    }
});

export default cartsRouter;