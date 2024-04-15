import CustomerAddressUpdatedEvent from "../customer-address-updated.event";

export default class SendConsoleLogWhenCustomerAddressIsUpdatedHandler {
    handle(event: CustomerAddressUpdatedEvent): void {

        // tslint:disable-next-line:no-console
        const {clientId, clientName, clientAddress} = event.eventData.data;
        // tslint:disable-next-line:variable-name
        const {street, number, zipCode, city} = clientAddress;

        // tslint:disable-next-line:no-console
        console.log(`Endereço do cliente: Id: ${clientId} , Nome: ${clientName} alterado para:
        Rua: ${street},
        Número: ${number},
        CEP: ${zipCode},
        Cidade: ${city}`);
    }
}