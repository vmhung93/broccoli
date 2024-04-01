import { Request, Response } from "express";

import ProductService from "../services/product.service";

class ProductController {
    private productService: ProductService;

    constructor() {
        this.productService = new ProductService();
    }

    public getAll = async (_req: Request, res: Response) => {
        try {
            const result = await this.productService.getAll();
            res.json(result);
        } catch (error) {
            throw error;
        }
    };

    public getById = async (req: Request, res: Response) => {
        try {
            const result = await this.productService.getById(req.params.id);
            res.json(result);
        } catch (error) {
            throw error;
        }
    };

    public create = async (req: Request, res: Response) => {
        try {
            const result = await this.productService.create(req.body);
            res.json(result);
        } catch (error) {
            throw error;
        }
    };
}

export default ProductController;
