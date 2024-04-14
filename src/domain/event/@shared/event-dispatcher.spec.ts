import EventDispatcher from "./event-dispatcher";
import SendEmailWhenProductIsCreatedHandler from "../product/handler/send-email-when-product-is-created.handler";
import ProductCreatedEvent from "../product/product-created.event";
import Address from "../../entity/address";
import Customer from "../../entity/customer";
import SendConsoleLog1WhenCustomerIsCreatedHandler
    from "../customer/handler/send-console-log-1-when-customer-is-created.handler";
import SendConsoleLog2WhenCustomerIsCreatedHandler
    from "../customer/handler/send-console-log-2-when-customer-is-created.handler";
import CustomerCreatedEvent from "../customer/customer-created.event";
import SendConsoleLogWhenCustomerAddressIsUpdatedHandler
    from "../customer/handler/send-console-log-when-customer-address-is-updated.handler";
import CustomerAddressUpdatedEvent from "../customer/customer-address-updated.event";

describe('Domain events test', () => {

    it('should register an event handler', () => {
        const eventDispatcher = new EventDispatcher();
        const eventHandler = new SendEmailWhenProductIsCreatedHandler();

        eventDispatcher.register('product-created.event', eventHandler);

        expect(eventDispatcher.eventHandlers['product-created.event']).toBeDefined();
        expect(eventDispatcher.eventHandlers['product-created.event'].length).toBe(1);
        expect(eventDispatcher.eventHandlers['product-created.event'][0]).toMatchObject(eventHandler);

    });

    it("should unregister an event handler", () => {
        const eventDispatcher = new EventDispatcher();
        const eventHandler = new SendEmailWhenProductIsCreatedHandler();

        eventDispatcher.register('product-created.event', eventHandler);
        expect(eventDispatcher.eventHandlers['product-created.event'][0]).toMatchObject(eventHandler);
        eventDispatcher.unregister('product-created.event', eventHandler);

        expect(eventDispatcher.eventHandlers['product-created.event']).toBeDefined();
        expect(eventDispatcher.eventHandlers['product-created.event'].length).toBe(0);
    });

    it("should unregister all event handlers", () => {
        // Register an event handler
        const eventDispatcher = new EventDispatcher();
        const eventHandler = new SendEmailWhenProductIsCreatedHandler();

        // Register an event handler
        eventDispatcher.register('product-created.event', eventHandler);
        expect(eventDispatcher.eventHandlers['product-created.event'][0]).toMatchObject(eventHandler);

        // Unregister all event handlers
        eventDispatcher.unregisterAll();
        expect(eventDispatcher.eventHandlers['product-created.event']).toBeUndefined();
    });

    it("should notify all event handlers", () => {

        // Register an event handler
        const eventDispatcher = new EventDispatcher();
        const eventHandler = new SendEmailWhenProductIsCreatedHandler();
        const spyEventHandler = jest.spyOn(eventHandler, 'handle')

        const productCreatedEvent = new ProductCreatedEvent({
            name: 'ProductCreatedEvent',
            data: {name: 'Product 1', description: 'Description 1', price: 100}
        })
        eventDispatcher.register('ProductCreatedEvent', eventHandler);


        // Notify an event handlers
        // when the event is notified, the event handler should be called
        expect(eventDispatcher.eventHandlers.ProductCreatedEvent[0]).toMatchObject(eventHandler);

        eventDispatcher.notify(productCreatedEvent);
        expect(spyEventHandler).toHaveBeenCalledTimes(1);

    });


    it('should notify when a new customer is created', () => {
        const eventDispatcher = new EventDispatcher();
        const eventHandler1 = new SendConsoleLog1WhenCustomerIsCreatedHandler();
        const eventHandler2 = new SendConsoleLog2WhenCustomerIsCreatedHandler();
        const spyEventHandler1 = jest.spyOn(eventHandler1, 'handle')
        const spyEventHandler2 = jest.spyOn(eventHandler2, 'handle')

        const newCustomer = new Customer('1', 'Customer 1');
        const address = new Address('Street 1', 1, '12345', 'City 1');
        newCustomer.changeAddress(address);
        const customerCreatedEvent = new CustomerCreatedEvent({
            name: 'CustomerCreatedEvent',
            data: newCustomer
        })

        eventDispatcher.register('CustomerCreatedEvent', eventHandler1);
        eventDispatcher.register('CustomerCreatedEvent', eventHandler2);

        expect(eventDispatcher.eventHandlers.CustomerCreatedEvent[0]).toMatchObject(eventHandler1);
        expect(eventDispatcher.eventHandlers.CustomerCreatedEvent[1]).toMatchObject(eventHandler2);
        expect(eventDispatcher.eventHandlers.CustomerCreatedEvent.length).toBe(2);


        eventDispatcher.notify(customerCreatedEvent);
        expect(spyEventHandler1).toHaveBeenCalledTimes(1);
        expect(spyEventHandler2).toHaveBeenCalledTimes(1);

        // test if the event handler is called with the correct event
        expect(spyEventHandler1).toHaveBeenCalledWith(customerCreatedEvent);
        expect(spyEventHandler2).toHaveBeenCalledWith(customerCreatedEvent);

    });

    it('should notify when a customer address is updated', () => {
        const eventDispatcher = new EventDispatcher();
        const eventHandler = new SendConsoleLogWhenCustomerAddressIsUpdatedHandler();
        const spyEventHandler = jest.spyOn(eventHandler, 'handle')

        const newCustomer = new Customer('1', 'João da Silva');
        const address = new Address('Dias da Cruz', 175, '22330-445', 'Rio de Janeiro');
        newCustomer.changeAddress(address);

        const addressUpdatedEvent = new CustomerAddressUpdatedEvent({
            name: 'CustomerAddressUpdatedEvent',
            data: {
                clientId: newCustomer.id,
                clientName: newCustomer.name,
                clientAddress: {
                    street: newCustomer.address.street,
                    number: newCustomer.address.number,
                    zipCode: newCustomer.address.zipCode,
                    city: newCustomer.address.city
                }
            }
        });

        eventDispatcher.register('CustomerAddressUpdatedEvent', eventHandler);
        expect(eventDispatcher.eventHandlers.CustomerAddressUpdatedEvent[0]).toMatchObject(eventHandler);

        eventDispatcher.notify(addressUpdatedEvent);
        expect(spyEventHandler).toHaveBeenCalledTimes(1);
        expect(spyEventHandler).toHaveBeenCalledWith(addressUpdatedEvent);

    })
    ;

});