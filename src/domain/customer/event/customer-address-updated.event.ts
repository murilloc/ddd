import EventInterface from "../../@shared/event/event.interface";
import CustomerCreatedEvent from "./customer-created.event";

export default class CustomerAddressUpdatedEvent implements EventInterface {
    dateTimeOccurred: Date;
    eventData: any;

    constructor(eventData: any) {
        this.dateTimeOccurred = new Date();
        this.eventData = eventData;
    }
}