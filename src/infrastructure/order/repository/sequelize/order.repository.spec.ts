import {Sequelize} from "sequelize-typescript";
import OrderRepository from "./order.repository";
import CustomerModel from "../../../customer/repository/sequelize/customer.model";
import ProductModel from "../../../product/repository/sequelize/product.model";
import OrderModel from "./order.model";
import OrderItemModel from "./order-item.model";
import CustomerRepository from "../../../customer/repository/sequelize/customer.repository";
import ProductRepository from "../../../product/repository/sequelize/product.repository";
import Product from "../../../../domain/product/entity/product";
import OrderItem from "../../../../domain/checkout/entity/order_item";
import Order from "../../../../domain/checkout/entity/order";
import Customer from "../../../../domain/customer/entity/customer";
import Address from "../../../../domain/customer/value-object/address";

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

    it('should find an order', async () => {
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
        const orderItem1 = new OrderItem('1', product.name, product.price, product.id, 2);
        const orderItem2 = new OrderItem('2', product.name, product.price, product.id, 3);
        const orderItems = [orderItem1, orderItem2];

        const order = new Order('1', customer.id, orderItems);
        const orderRepository = new OrderRepository();
        await orderRepository.create(order);

        // Find order
        const orderModel = await OrderModel.findOne({where: {id: order.id}, include: ["items"]});
        const orderFound = await orderRepository.find(order.id);

        expect(orderModel.toJSON()).toStrictEqual({
            id: orderFound.id,
            customerId: orderFound.customerId,
            total: orderFound.total(),
            items: orderFound.items.map((item) => ({
                id: item.id,
                name: item.name,
                price: item.price,
                quantity: item.quantity,
                productId: item.productId,
                orderId: order.id,
            }))
        });
    });

    it('should return all orders', async () => {
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
        const orderItem1 = new OrderItem('1', product.name, product.price, product.id, 2);
        const orderItem2 = new OrderItem('2', product.name, product.price, product.id, 3);
        const orderItems = [orderItem1, orderItem2];

        const order = new Order('1', customer.id, orderItems);
        const orderRepository = new OrderRepository();
        await orderRepository.create(order);

        const orderItem3 = new OrderItem('3', product.name, product.price, product.id, 4);
        const orderItem4 = new OrderItem('4', product.name, product.price, product.id, 5);
        const orderItems2 = [orderItem3, orderItem4];

        const order2 = new Order('2', customer.id, orderItems2);
        await orderRepository.create(order2);

        // Find all orders
        const orders = await orderRepository.findAll();

        // map don´t work with async
        for (const order of orders) {
            // Find order
            const orderModel = await OrderModel.findOne({where: {id: order.id}, include: ["items"]});//
            expect(orderModel.toJSON()).toStrictEqual({
                id: order.id,
                customerId: customer.id,
                total: order.total(),
                items: order.items.map((item) => ({
                    id: item.id,
                    name: item.name,
                    price: item.price,
                    quantity: item.quantity,
                    productId: item.productId,
                    orderId: order.id,
                }))
            });
        }
    });

    it('should update an order', async () => {
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
        const orderItem1 = new OrderItem('1', product.name, product.price, product.id, 2);
        const orderItem2 = new OrderItem('2', product.name, product.price, product.id, 3);
        const orderItems = [orderItem1, orderItem2];

        const order = new Order('1', customer.id, orderItems);
        const orderRepository = new OrderRepository();
        await orderRepository.create(order);

        // Update order
        const orderItem3 = new OrderItem('3', product.name, product.price, product.id, 4);
        const orderItem4 = new OrderItem('4', product.name, product.price, product.id, 5);
        const orderItems2 = [orderItem3, orderItem4];

        const updatedOrder = new Order('1', customer.id, orderItems2);
        await orderRepository.update(updatedOrder);

        // Find order
        const orderModel = await OrderModel.findOne({where: {id: order.id}, include: ["items"]});
        expect(orderModel.toJSON()).toStrictEqual({
            id: order.id,
            customerId: customer.id,
            total: updatedOrder.total(),
            items: updatedOrder.items.map((item) => ({
                id: item.id,
                name: item.name,
                price: item.price,
                quantity: item.quantity,
                productId: item.productId,
                orderId: order.id,
            }))
        });
    });
});
