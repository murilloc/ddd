import OrderItem from './order_item';

export default class Order {
    private readonly _id: string;
    private readonly _customerId: string;
    private _items: OrderItem[];

    constructor(id: string, customerId: string, items: OrderItem[]) {
        this._id = id;
        this._customerId = customerId;
        this._items = items;
        this.validate();
    }

    addItem(item: OrderItem) {
        this._items.push(item);
    }

    get items(): OrderItem[] {
        return this._items;
    }

    get id(): string {
        return this._id;
    }

    removeItem(item: OrderItem) {
        this._items = this._items.filter((i) => i !== item);
    }

    total(): number {
        return this._items.reduce((acc, item) => acc + item.orderItemTotal(), 0);
    }

    get customerId(): string {
        return this._customerId;
    }

    validate(): boolean {
        if (this._id.length === 0) {
            throw new Error('Id is required');
        }

        if (this._customerId.length === 0) {
            throw new Error('CustomerId is required');
        }

        if (this._items.length === 0) {
            throw new Error('Items quantity must be greater than zero');
        }

        if (this._items.some((item) => item.quantity <= 0)) {
            throw new Error('Items quantity must be greater than zero');
        }

        return true;
    }
}
