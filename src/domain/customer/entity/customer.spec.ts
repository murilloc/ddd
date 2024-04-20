import Address from '../value-object/address';
import Customer from './customer';

describe('Customer unit test', () => {
  it('shoult throw error hen id is empty', () => {
    expect(() => new Customer('', 'John Doe')).toThrow('Id is required');
  });

  it('should throw error when name is empty', () => {
    expect(() => new Customer('1', '')).toThrow('Name is required');
  });

  // Triple A pattern: Arrange, Act, Assert
  it('should change name', () => {
    const customer = new Customer('1', 'John Doe');
    customer.changeName('Jane Doe');
    expect(customer.name).toBe('Jane Doe');
  });

  it('should activate customer', () => {
    const address = new Address(
      'Rua Alexandre MAckenzie',
      75,
      '12345-678',
      'São Paulo'
    );
    const customer = new Customer('1', 'John Doe');
    customer.changeAddress(address);
    customer.activate();
    expect(customer.isActive()).toBe(true);
  });

  it('should deactivate customer', () => {
    const customer = new Customer('1', 'John Doe');
    customer.deactivate();
    expect(customer.isActive()).toBe(false);
  });

  it('should throw error when activating customer without address', () => {
    const customer = new Customer('1', 'John Doe');
    expect(() => customer.activate()).toThrow(
      'Address is required to activate the customer'
    );
  });

  it('should throw error when changing name to empty', () => {
    const customer = new Customer('1', 'John Doe');
    expect(() => customer.changeName('')).toThrow('Name is required');
  });

  it('should add reward points', () => {
    const customer = new Customer('1', 'John Doe');
    expect(customer.rewardPoints).toBe(0);
    customer.addRewardPoints(100);
    expect(customer.rewardPoints).toBe(100);
    customer.addRewardPoints(50);
    expect(customer.rewardPoints).toBe(150);
  });
});
