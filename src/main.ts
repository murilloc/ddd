import Address from './domain/customer/value-object/address';
import Customer from './domain/customer/entity/customer';
import Order from './domain/checkout/entity/order';
import OrderItem from './domain/checkout/entity/order_item';

let customer = new Customer('123', 'John Doe');
const address = new Address('123 Main St', 1045, '22323-444', 'Rio de Janeiro');
customer.changeAddress(address);
customer.activate();

const item1 = new OrderItem('1', 'c1', 50, 'p1', 10);
const item2 = new OrderItem('2', 'c1', 200, 'p2', 5);
const item3 = new OrderItem('3', 'c1', 50, 'p3', 8);

const order = new Order('1', '123', [item1, item2, item3]);
