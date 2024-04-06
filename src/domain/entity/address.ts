// Purpose: Object value.
export default class Address {
  _street: string;
  _number: number;
  _zipCode: string;
  _city: string;

  constructor(street: string, number: number, zip: string, city: string) {
    this._street = street;
    this._number = number;
    this._zipCode = zip;
    this._city = city;
    this.validate();
  }

  get street() {
    return this._street;
  }

  get number() {
    return this._number;
  }

  get zipCode() {
    return this._zipCode;
  }

  get city() {
    return this._city;
  }

  validate() {
    if (!this._street) {
      throw new Error('Street is required');
    }
    if (!this._number) {
      throw new Error('Number is required');
    }
    if (!this._zipCode) {
      throw new Error('Zip is required');
    }
    if (!this._city) {
      throw new Error('City is required');
    }
  }

  toString() {
    return `${this._street} ${this._number}, ${this._zipCode} ${this._city}`;
  }
}
