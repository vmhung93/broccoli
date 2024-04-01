import express from "express";

import ProductController from "../controller/product.controller";

const productRouter = express.Router();
const productController = new ProductController();

productRouter.get("/", productController.getAll);
productRouter.get("/:id", productController.getById);
productRouter.post("/add", productController.create);

export default productRouter;
