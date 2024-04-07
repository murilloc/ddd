import {Sequelize} from "sequelize-typescript";
import OrderRepository from "./order.repository";
import CustomerModel from "../db/sequelize/model/customer.model";
import ProductModel from "../db/sequelize/model/product.model";
import OrderModel from "../db/sequelize/model/order.model";
import OrderItemModel from "../db/sequelize/model/order-item.model";
import CustomerRepository from "./customer.repository";
import ProductRepository from "./product.repository";
import Product from "../../domain/entity/product";
import OrderItem from "../../domain/entity/order_item";
import Order from "../../domain/entity/order";
import Customer from "../../domain/entity/customer";
import Address from "../../domain/entity/address";

describe('Order repository unity test', () => {
    let sequelize: Sequelize;

    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: "sqlite",
            storage: ":memory:",
            logging: false,
            sync: {force: true},
        });

        sequelize.addModels([
            CustomerModel,
            ProductModel,
            OrderModel,
            OrderItemModel,
        ]);
        await sequelize.sync();
    });

    afterEach(async () => {
        await sequelize.close();
    });

    it('should return true', () => {
        expect(true).toBeTruthy();
    });


    it('should create a new order', async () => {
        // Create a customer
        const customerRepository = new CustomerRepository();
        const customer = new Customer('1', 'John Doe');
        const address = new Address('Main Street', 100, '12345', 'New York');
        customer.changeAddress(address);
        await customerRepository.create(customer);

        // Create a product
        const productRepository = new ProductRepository();
        const product = new Product('123', 'Product 1', 100);
        await productRepository.create(product);

        // Create an order
        const orderItem = new OrderItem('1', product.name, product.price, product.id, 2);
        const order = new Order('1', customer.id, [orderItem]);
        const orderRepository = new OrderRepository();
        await orderRepository.create(order);

        // Check if order was created
        const orderModel = await OrderModel.findOne({where: {id: order.id}, include: ["items"]});//
        expect(orderModel.toJSON()).toStrictEqual({
            id: '1',
            customerId: customer.id,
            total: order.total(),
            items: [
                {
                    id: orderItem.id,
                    name: orderItem.name,
                    price: orderItem.price,
                    quantity: orderItem.quantity,
                    productId: product.id,
                    orderId: order.id,
                }
            ]
        });
    });
});

