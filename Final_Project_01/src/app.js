import express from "express";
import productsRouter from "./routes/products.js";
import cartsRouter from "./routes/carts.js";
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use((req, res, next) => {
    console.log(`[${req.method}] ${req.url}`);
    next();
});
app.use("/api/products", productsRouter);
app.use("/api/carts", cartsRouter);
app.listen(8080, () => {
    console.log("Server is now listening at port: 8080.");
});