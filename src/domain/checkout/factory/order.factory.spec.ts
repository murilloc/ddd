import {v4 as uuid} from 'uuid';
import OrderFactory from "./order.factory";


describe('Order factory unit test', () => {
    it('should create an order', () => {
        const orderProps = {
            id: uuid(),
            customerId: uuid(),
            items: [
                {
                    id: uuid(),
                    name: 'Product 1',
                    price: 100,
                    productId: uuid(),
                    quantity: 10
                },
                {
                    id: uuid(),
                    name: 'Product 2',
                    price: 200,
                    productId: uuid(),
                    quantity: 20
                }
            ]
        };
        const order = OrderFactory.create(orderProps);
        expect(order.id).toBe(orderProps.id);
        expect(order.customerId).toBe(orderProps.customerId);
        expect(order.items.length).toBe(2);
        orderProps.items.forEach((item, index) => {
            expect(order.items[index].id).toBe(item.id);
            expect(order.items[index].name).toBe(item.name);
            expect(order.items[index].price).toBe(item.price);
            expect(order.items[index].productId).toBe(item.productId);
            expect(order.items[index].quantity).toBe(item.quantity);
        });
    })
});