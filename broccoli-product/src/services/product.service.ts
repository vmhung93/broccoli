import { Repository } from "typeorm";

import dataSource from "../database";

import { Product } from "../entities/product.entity";

import { ProductDTO } from "../dto/product.dto";

class ProductService {
    private productRepository: Repository<Product>;

    constructor() {
        this.productRepository = dataSource.getRepository(Product);
    }

    public getAll = async (): Promise<Product[]> => {
        try {
            return await this.productRepository.find();
        } catch (error) {
            throw error;
        }
    };

    public getById = async (id: string): Promise<Product | null> => {
        try {
            return await this.productRepository.findOne({ where: { id } });
        } catch (error) {
            throw error;
        }
    };

    public create = async (dto: ProductDTO): Promise<Product> => {
        try {
            const product = new Product();

            product.name = dto.name;
            product.description = dto.description;
            product.image = dto.image;
            product.category = dto.category;
            product.unit = dto.unit;
            product.price = dto.price;
            product.available = true;

            return await this.productRepository.save(product);
        } catch (error) {
            throw error;
        }
    };
}

export default ProductService;
