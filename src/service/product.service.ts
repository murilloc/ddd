import Product from '../entity/product';

// Faz mais sentido criar uma storedProcedure e realizar essa operqação no banco de dados
export default class ProductService {
  static increasePrice(products: Product[], percentage: number): Product[] {
    products.forEach((product) => {
      product.changePrice((product.price * percentage) / 100 + product.price);
    });
    return products;
  }
}
