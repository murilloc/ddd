import EventDispatcherInterface from "./event-dispatcher.inderface";
import EventHandlerInterface from "./event-handler.interface";
import EventInterface from "./event.interface";

export default class EventDispatcher implements EventDispatcherInterface {

    private eventHandles: { [eventName: string]: EventHandlerInterface[] } = {
        ['']: []
    };

    get eventHandlers(): { [eventName: string]: EventHandlerInterface[] } {
        return this.eventHandles;
    }

    notify(event: EventInterface): void {
        // Get the class name of the event
        const eventName = event.constructor.name;
        if (this.eventHandlers[eventName]) {
            this.eventHandlers[eventName].forEach((eventHandler: EventHandlerInterface) => {
                eventHandler.handle(event);
            });
        }
    }


    // The register method is used to add an event handler to a specific event name.
    register(eventName: string, eventHandler: EventHandlerInterface): void {

        // If the event name does not exist, create it
        if (!this.eventHandlers[eventName]) {
            this.eventHandlers[eventName] = [];
        }

        // Add the event handler to the event name
        this.eventHandlers[eventName].push(eventHandler);
    }

    unregister(eventName: string, eventHandler: EventHandlerInterface): void {

        if (this.eventHandlers[eventName]) {
            const index = this.eventHandlers[eventName].indexOf(eventHandler);
            if (index !== -1) {
                this.eventHandlers[eventName].splice(index, 1);
            }
        }
    }

    unregisterAll(): void {
        this.eventHandles = {['']: []};
    }
}