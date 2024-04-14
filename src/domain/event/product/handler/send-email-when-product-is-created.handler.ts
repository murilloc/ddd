import EventHandlerInterface from "../../@shared/event-handler.interface";

export default class SendEmailWhenProductIsCreatedHandler implements EventHandlerInterface {
    handle(event: any): void {
        // tslint:disable-next-line:no-console
        console.log(`Sending email to............`); // ex. sending to kafka or RabbitMQ
    }
}