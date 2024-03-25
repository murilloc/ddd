import OrderItem from './order_item';

export default class Order {
  private _id: string;
  private _customerId: string;
  private _items: OrderItem[];
  private _total: number;

  constructor(id: string, customerId: string, items: OrderItem[]) {
    this._id = id;
    this._customerId = customerId;
    this._items = items;
    this._total = this.total();
    this.validate();
  }

  addItem(item: OrderItem) {
    this._items.push(item);
  }

  get items(): Array<OrderItem> {
    return this._items;
  }

  removeItem(item: OrderItem) {
    this._items = this._items.filter((i) => i !== item);
  }

  total(): number {
    return this._items.reduce((acc, item) => acc + item.price, 0);
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

    return true;
  }
}
