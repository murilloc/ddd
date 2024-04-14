import EventHandlerInterface from "../../@shared/event-handler.interface";

export default class SendConsoleLog2WhenCustomerIsCreatedHandler implements EventHandlerInterface {
    handle(event: any): void {
        // tslint:disable-next-line:no-console
        console.log(`Esse é o segundo console.log do evento: CustomerCreated`);
    }
}