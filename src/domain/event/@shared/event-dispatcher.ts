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

    }

    register(eventName: string, eventHandler: EventHandlerInterface): void {

        if (!this.eventHandlers[eventName]) {
            this.eventHandlers[eventName] = [];
        }

        this.eventHandlers[eventName].push(eventHandler);

    }

    unregister(eventName: string, eventHandler: EventHandlerInterface): void {

    }

    unregisterAll(): void {

    }
}