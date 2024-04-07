import Order from "../../domain/entity/order";
import OrderModel from "../db/sequelize/model/order.model";
import OrderItemModel from "../db/sequelize/model/order-item.model";
import OrderRepositoryInterface from "../../domain/repository/order-repository.interface";
import OrderItem from "../../domain/entity/order_item";
import ProductModel from "../db/sequelize/model/product.model";

export default class OrderRepository implements OrderRepositoryInterface {
    async create(entity: Order): Promise<void> {
        // Create order in database
        await OrderModel.create({
            id: entity.id,
            customerId: entity.customerId,
            total: entity.total(),
            items: entity.items.map((item) => ({
                id: item.id,
                name: item.name,
                price: item.price,
                quantity: item.quantity,
                productId: item.productId,
            })),
        }, {include: [{model: OrderItemModel}]});
    }

    async find(id: string): Promise<Order> {
        let orderModel;
        try {
            orderModel = await OrderModel.findOne({where: {id}, include: ["items"], rejectOnEmpty: true});
        } catch (e) {
            throw new Error('Order not found');
        }

        // Convert orderModel to Order entity
        const orderItems = orderModel.items.map(item => new OrderItem(item.id, item.name, item.price, item.productId, item.quantity));
        return new Order(orderModel.id, orderModel.customerId, orderItems);
    }

    async findAll(): Promise<Order[]> {
        let orderModels;
        let orders;

        orderModels = await OrderModel.findAll({include: ["items"]});
        orders = orderModels.map(orderModel => {
            const orderItems = orderModel.items.map(item => new OrderItem(item.id, item.name, item.price, item.productId, item.quantity));
            return new Order(orderModel.id, orderModel.customerId, orderItems);
        });
        return orders;
    }

    async update(entity: Order): Promise<void> {
        // Find the existing order
        const orderModel = await OrderModel.findOne({where: {id: entity.id}});

        if (!orderModel) {
            throw new Error('Order not found');
        }

        // Update the order fields
        orderModel.customerId = entity.customerId;
        orderModel.total = entity.total();

        // Remove all existing order items
        await OrderItemModel.destroy({where: {orderId: entity.id}});

        // Add new order items
        const orderItems = entity.items.map((item) => ({
            id: item.id,
            name: item.name,
            price: item.price,
            quantity: item.quantity,
            productId: item.productId,
            orderId: entity.id,
        }));
        await OrderItemModel.bulkCreate(orderItems);

        // Save the order
        await orderModel.save();
    }
}