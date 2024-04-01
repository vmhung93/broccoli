import BaseDTO from "./base.dto";

interface ProductDTO extends BaseDTO {
    name: string;
    description: string;
    image: string;
    category: string;
    unit: number;
    price: number;
    available: boolean;
}

export { ProductDTO };
