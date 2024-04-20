import ProductInterface from "../entity/product.interface";
import Product from "../entity/product";
import {v4 as uuid} from 'uuid';
import ProductB from "../entity/product-b";

export default class ProductFactory {
    static create(type: string, name: string, price: number): ProductInterface {

        switch (type) {
            case 'A':
                return new Product(uuid(), name, price);
            case 'B':
                return new ProductB(uuid(), name, price);
            default:
                throw new Error('Invalid product type');
        }
    }
}