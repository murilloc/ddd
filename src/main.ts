import Address from './entity/address';
import Customer from './entity/customer';
import Order from './entity/order';
import OrderItem from './entity/order_item';

let customer = new Customer('123', 'John Doe');
const address = new Address('123 Main St', 1045, '22323-444', 'Rio de Janeiro');
customer.address = address;
customer.activate();

const item1 = new OrderItem('1', 'Product 1', 100);
const item2 = new OrderItem('2', 'Product 2', 200);
const item3 = new OrderItem('3', 'Product 3', 300);

const order = new Order(1, '123', [item1, item2, item3]);
