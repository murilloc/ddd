// Purpose: Define the Customer class.
// Business Entity: Customer
// Properties: Id, Name, Address, Active

import Address from './address';

export default class Customer {
  private _id: string;
  private _name: string;
  private _address!: Address;
  private _active: boolean = false;
  private _rewardPoints: number = 0;

  constructor(id: string, name: string) {
    this._id = id;
    this._name = name;
    this.validate();
  }

  changeName(name: string) {
    this._name = name;
    this.validate();
  }

  get name(): string {
    return this._name;
  }

  activate() {
    if (this._address === undefined) {
      throw new Error('Address is required to activate the customer');
    }
    this._active = true;
  }

  deactivate() {
    this._active = false;
  }

  validate() {
    if (this._id.length === 0) {
      throw new Error('Id is required');
    }
    if (!this._name) {
      throw new Error('Name is required');
    }
  }

  isActive(): boolean {
    return this._active;
  }

  get address(): Address {
    return this._address;
  }

  set address(address: Address) {
    this._address = address;
  }

  addRewardPoints(points: number) {
    this._rewardPoints += points;
  }

  get rewardPoints(): number {
    return this._rewardPoints;
  }

  get id(): string {
    return this._id;
  }
}
