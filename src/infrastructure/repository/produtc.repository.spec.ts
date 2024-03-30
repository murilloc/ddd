import { Sequelize } from 'sequelize-typescript';
import ProductModel from '../db/sequelize/model/product.model';
import Product from '../../domain/entity/product';
import ProductRepository from './product.repository';
describe('Producy repository test', () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: 'sqlite',
      storage: ':memory:',
      logging: false,
      sync: { force: true },
    });
    sequelize.addModels([ProductModel]);
    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it('should create a product', async () => {
    const productRepository = new ProductRepository();
    const product = new Product('1', 'Product 1', 100);
    await productRepository.create(product);

    const productModel = await ProductModel.findOne({ where: { id: '1' } });
    expect(productModel.toJSON()).toStrictEqual({
      id: '1',
      name: 'Product 1',
      price: 100,
    });
  });

  it('should update a product', async () => {
    const productRepository = new ProductRepository();
    const product = new Product('1', 'Product 1', 100);
    await productRepository.create(product);

    product.changePrice(200);
    await productRepository.update(product);

    const productModel1 = await ProductModel.findOne({ where: { id: '1' } });
    expect(productModel1.toJSON()).toStrictEqual({
      id: '1',
      name: 'Product 1',
      price: 200,
    });

    product.changeName('Product 2');
    await productRepository.update(product);
    const productModel2 = await ProductModel.findOne({ where: { id: '1' } });
    expect(productModel2.toJSON()).toStrictEqual({
      id: '1',
      name: 'Product 2',
      price: 200,
    });
  });

  it('should find a product', async () => {
    const productRepository = new ProductRepository();
    const product = new Product('1', 'Product 1', 100);
    await productRepository.create(product);

    const productModel = await ProductModel.findOne({ where: { id: '1' } });

    const productFound = await productRepository.find('1');
    expect(productModel.toJSON()).toStrictEqual({
      id: productFound.id,
      name: productFound.name,
      price: productFound.price,
    });
  });

  it('should find all products', async () => {
    const productRepository = new ProductRepository();
    const product1 = new Product('1', 'Product 1', 100);
    const product2 = new Product('2', 'Product 2', 200);
    await productRepository.create(product1);
    await productRepository.create(product2);

    const productModels = await ProductModel.findAll();

    const productsFound = await productRepository.findAll();
    expect(productModels.map((m) => m.toJSON())).toStrictEqual(
      productsFound.map((p) => ({
        id: p.id,
        name: p.name,
        price: p.price,
      }))
    );
  });
});
