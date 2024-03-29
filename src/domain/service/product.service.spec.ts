import Product from '../entity/product';
import ProductService from './product.service';

describe('Product service unit test', () => {
  it('should change the price of all products', () => {
    const products = [];
    const product1 = new Product('p1', 'Product 1', 100);
    const product2 = new Product('p2', 'Product 2', 200);
    products.push(product1);
    products.push(product2);
    const modifiedProducts = ProductService.increasePrice(products, 10);

    expect(modifiedProducts[0].price).toBe(110);
    expect(modifiedProducts[1].price).toBe(220);
  });
});
