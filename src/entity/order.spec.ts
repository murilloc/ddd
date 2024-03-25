import Order from './order';
import OrderItem from './order_item';

describe('Order unit test', () => {
  it('should throw error when id is empty', () => {
    expect(() => new Order('', '1', [])).toThrow('Id is required');
  });

  it('should throw error when customerId is empty', () => {
    expect(() => new Order('1', '', [])).toThrow('CustomerId is required');
  });

  it('should throw error when items is empty', () => {
    expect(() => new Order('1', '1', [])).toThrow(
      'Items quantity must be greater than zero'
    );
  });

  it('should add item', () => {
    const items = [];
    items.push(new OrderItem('1', '1', 10));
    const order = new Order('1', '1', items);
    order.addItem(new OrderItem('2', '2', 20));
    expect(order.items.length).toBe(2);
  });

  it('should remove item', () => {
    const items = [];
    const item = new OrderItem('1', '1', 10);
    items.push(item);
    const order = new Order('1', '1', items);
    order.removeItem(item);
    expect(order.items.length).toBe(0);
  });

  it('should calculate total', () => {
    const items = [];
    const item1 = new OrderItem('1', '1', 10.6);
    const item2 = new OrderItem('2', '2', 20.3);
    items.push(item1);
    items.push(item2);
    const order = new Order('1', '1', items);
    expect(order.total()).toBe(30.9);
  });
});
