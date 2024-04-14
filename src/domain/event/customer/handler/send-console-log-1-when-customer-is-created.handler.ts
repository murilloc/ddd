import EventHandlerInterface from "../../@shared/event-handler.interface";

export default class SendConsoleLog1WhenCustomerIsCreatedHandler implements EventHandlerInterface {
    handle(event: any): void {
        // tslint:disable-next-line:no-console
        console.log(`Esse é o primeiro console.log do evento: CustomerCreated`);
    }
}