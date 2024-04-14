import EventDispatcher from "./event-dispatcher";
import SendEmailWhenProductIsCreatedHandler from "../product/handler/send-email-when-product-is-created.handler";
import ProductCreatedEvent from "../product/product-created.event";

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

});