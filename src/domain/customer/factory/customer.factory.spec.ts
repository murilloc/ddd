import CustomerFactory from "./customer.factory";
import Address from "../value-object/address";

describe('Customer factory unit test', () => {
    it('should create a customer', () => {
        const customer = CustomerFactory.create("John");
        expect(customer.id).toBeDefined();
        expect(customer.name).toBe("John");
        expect(customer.address).toBeUndefined();
    });

    it("should create a customer with address", () => {
        const address = new Address("Main St", 123, "22354-268", "Springfield");
        const customer = CustomerFactory.createWithAddress("John", address);
        expect(customer.id).toBeDefined();
        expect(customer.name).toBe("John");
        expect(customer.address).toBe(address);
    });


});
