import {Sequelize} from 'sequelize-typescript';
import CustomerModel from '../db/sequelize/model/customer.model';
import Customer from '../../domain/entity/customer';
import CustomerRepository from './customer.repository';
import Address from '../../domain/entity/address';

describe('Customer repository test', () => {
    let sequelize: Sequelize;

    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: 'sqlite',
            storage: ':memory:',
            logging: false,
            sync: {force: true},
        });
        sequelize.addModels([CustomerModel]);
        await sequelize.sync();
    });

    afterEach(async () => {
        await sequelize.close();
    });

    it('should create a customer', async () => {
        const customerRepository = new CustomerRepository();
        const customer = new Customer('1', 'John Doe');
        const address = new Address('Main Street', 100, '12345', 'New York');
        customer.changeAddress(address);

        await customerRepository.create(customer);

        const customerModel = await CustomerModel.findOne({where: {id: '1'}});
        const entity = await customerRepository.find('1');
        expect(customerModel.toJSON()).toStrictEqual({
            id: entity.id,
            name: entity.name,
            active: entity.isActive(),
            rewardPoints: entity.rewardPoints,
            street: entity.address.street,
            number: entity.address.number,
            zipCode: entity.address.zipCode,
            city: entity.address.city,
        });
    });

    it('should update a customer', async () => {
        const customerRepository = new CustomerRepository();
        const customer = new Customer('1', 'John Doe');
        const address = new Address('Main Street', 100, '12345', 'New York');
        customer.changeAddress(address);

        await customerRepository.create(customer);

        const updatedCustomer = new Customer('1', 'John Doe');
        const updatedAddress = new Address('Second Street', 200, '54321', 'Los Angeles');
        updatedCustomer.changeAddress(updatedAddress);

        await customerRepository.update(updatedCustomer);

        const customerModel = await CustomerModel.findOne({where: {id: '1'}});
        const entity = await customerRepository.find('1');
        expect(customerModel.toJSON()).toStrictEqual({
            id: entity.id,
            name: entity.name,
            active: entity.isActive(),
            rewardPoints: entity.rewardPoints,
            street: entity.address.street,
            number: entity.address.number,
            zipCode: entity.address.zipCode,
            city: entity.address.city,
        });
    });

    it('should find a customer', async () => {
        const customerRepository = new CustomerRepository();
        const customer = new Customer('1', 'John Doe');
        const address = new Address('Main Street', 100, '12345', 'New York');
        customer.changeAddress(address);

        await customerRepository.create(customer);
        const customerResult = await customerRepository.find(customer.id);
        expect(customer).toStrictEqual(customerResult);
    });

    it('should throw an error when customer is not found', async () => {
        const customerRepository = new CustomerRepository();
        await expect(customerRepository.find('155645')).rejects.toThrow('Customer not found');
    });

    it('should find all customers', async () => {
        const customerRepository = new CustomerRepository();
        const customer1 = new Customer('1', 'John Doe');
        const address1 = new Address('Main Street', 100, '12345', 'New York');
        customer1.changeAddress(address1);

        const customer2 = new Customer('2', 'Jane Doe');
        const address2 = new Address('Second Street', 200, '54321', 'Los Angeles');
        customer2.changeAddress(address2);

        await customerRepository.create(customer1);
        await customerRepository.create(customer2);

        const customers = await customerRepository.findAll();
        expect(customers.length).toBe(2);
        expect(customers[0]).toStrictEqual(customer1);
        expect(customers[1]).toStrictEqual(customer2);
    });

    it('should find all customers when there are no customers', async () => {
        const customerRepository = new CustomerRepository();
        const customers = await customerRepository.findAll();
        expect(customers.length).toBe(0);
    });

    it('should find all active customers', async () => {
        const customerRepository = new CustomerRepository();
        const customer1 = new Customer('1', 'John Doe');
        const address1 = new Address('Main Street', 100, '12345', 'New York');
        customer1.changeAddress(address1);
        customer1.activate();

        const customer2 = new Customer('2', 'Jane Doe');
        const address2 = new Address('Second Street', 200, '54321', 'Los Angeles');
        customer2.changeAddress(address2);
        customer2.activate();

        const customer3 = new Customer('3', 'Jack Doe');
        const address3 = new Address('Third Street', 300, '54321', 'Los Angeles');
        customer3.changeAddress(address3);
        customer3.deactivate();

        await customerRepository.create(customer1);
        await customerRepository.create(customer2);
        await customerRepository.create(customer3);

        const customers = await customerRepository.findAllActive();
        expect(customers.length).toBe(2);
        expect(customers[0]).toStrictEqual(customer1);
        expect(customers[1]).toStrictEqual(customer2);
    });
});
