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
    items.push(new OrderItem('1', '1', 10, 'p1', 2));
    const order = new Order('1', '1', items);
    order.addItem(new OrderItem('2', '2', 20, 'p1', 3));
    expect(order.items.length).toBe(2);
  });

  it('should remove item', () => {
    const items = [];
    const item = new OrderItem('oi1', 'c1', 10, 'p1', 1);
    items.push(item);
    const order = new Order('o1', 'c1', items);
    order.removeItem(item);
    expect(order.items.length).toBe(0);
  });

  it('should calculate total', () => {
    const items = [];
    const item1 = new OrderItem('oi1', 'c1', 10.6, 'p1', 1);
    const item2 = new OrderItem('oi2', 'c2', 20.3, 'p2', 3);
    items.push(item1);
    items.push(item2);
    const order = new Order('o4', 'c1', items);
    expect(order.total()).toBe(71.5);
  });

  it('should throw error if the item qty is not less or zero', () => {
    expect(() => {
      const items = [];
      const item1 = new OrderItem('oi1', 'c1', 10.6, 'p1', 0);
      items.push(item1);
      const order = new Order('o4', 'c1', items);
      // code that throws an error
      order.validate();
    }).toThrow('Items quantity must be greater than zero');
  });
});
