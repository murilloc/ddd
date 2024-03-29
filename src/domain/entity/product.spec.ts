import Product from './product';

describe('Product unit test', () => {
  it('shoult throw error hen id is empty', () => {
    expect(() => new Product('', 'Product 1', 100)).toThrow('Id is required');
  });

  it('should throw error when name is empty', () => {
    expect(() => new Product('1', '', 100)).toThrow('Name is required');
  });

  it('should throw error when price is less than zero', () => {
    expect(() => new Product('1', 'Product 1', -100)).toThrow(
      'Price must be greater than zero'
    );
  });

  it('should change name', () => {
    const product = new Product('1', 'Product 1', 100);
    product.changeName('Product 2');
    expect(product.name).toBe('Product 2');
  });

  it('shoud change price', () => {
    const product = new Product('1', 'Product 1', 100);
    product.changePrice(200);
    expect(product.price).toBe(200);
  });
});
