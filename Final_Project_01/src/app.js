import express from "express";
import productsRouter from "./routes/products.js";

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/api/products", productsRouter);

app.listen(8080, () => {
    console.log("Server is now listening at port: 8080.");
});