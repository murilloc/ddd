import Customer from '../../domain/entity/customer';
import RepositoryInterface from '../../domain/repository/repository-interface';
import CustomerModel from '../db/sequelize/model/customer.model';
import Address from "../../domain/entity/address";

export default class CustomerRepository
    implements RepositoryInterface<Customer> {
    async create(entity: Customer): Promise<void> {
        // Create customer in database
        await CustomerModel.create({
            id: entity.id,
            name: entity.name,
            number: entity.address.number,
            street: entity.address.street,
            zipCode: entity.address.zipCode,
            city: entity.address.city,
            active: entity.isActive(),
            rewardPoints: entity.rewardPoints,
        });
    }

    async update(entity: Customer): Promise<void> {
        // Update customer in database
        await CustomerModel.update({
            name: entity.name,
            number: entity.address.number,
            street: entity.address.street,
            zipCode: entity.address.zipCode,
            city: entity.address.city,
            active: entity.isActive(),
            rewardPoints: entity.rewardPoints,
        }, {where: {id: entity.id}});
    }

    async find(id: string): Promise<Customer> {
        let customerModel;
        try {
            customerModel = await CustomerModel.findOne({where: {id}, rejectOnEmpty: true});
        } catch (e) {
            throw new Error('Customer not found');
        }

        const address = new Address(
            customerModel.street,
            customerModel.number,
            customerModel.zipCode,
            customerModel.city
        );
        const customer = new Customer(customerModel.id, customerModel.name);
        customer.changeAddress(address);
        return customer;
    }

    async findAll(): Promise<Customer[]> {
        // Find all customers from database
        const customerModels = await CustomerModel.findAll();
        return customerModels.map((customerModel) => {
            const customer = new Customer(customerModel.id, customerModel.name);
            customer.addRewardPoints(customerModel.rewardPoints);
            if (customerModel.active) {
                customer.activate();
            }
            const address = new Address(
                customerModel.street,
                customerModel.number,
                customerModel.zipCode,
                customerModel.city
            );
            customer.changeAddress(address);
            if (customerModel.active) {
                customer.activate();
            }
            return customer;
        });
    }

    async delete(id: string): Promise<void> {
        // Delete customer from database
        await CustomerModel.destroy({where: {id}});
    }

    async findAllActive(): Promise<Customer[]> {
        // Find all active customers from database
        const customerModels = await CustomerModel.findAll({where: {active: true}});
        return customerModels.map((customerModel) => {
            const customer = new Customer(customerModel.id, customerModel.name);
            customer.addRewardPoints(customerModel.rewardPoints);
            const address = new Address(
                customerModel.street,
                customerModel.number,
                customerModel.zipCode,
                customerModel.city
            );
            customer.changeAddress(address);
            if (customerModel.active) {
                customer.activate();
            }
            return customer;
        });
    }
}
