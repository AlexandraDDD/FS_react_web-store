
import { makeAutoObservable } from 'mobx';

export default class BasketStore {
  constructor() {
    this._Bsdevices = [];
    this._totalPrice = 0;
    this._count = 0;

    makeAutoObservable(this);
  }

  setTotalPrice(totalPrice){
    this._totalPrice =   totalPrice 

  }
  setDevices(Bsdevices) {
    this._Bsdevices =  Bsdevices
  }

  addDevice(deviceId) {
    const device = this._Bsdevices.find((d) => d.deviceId === deviceId);
  
    if (device) {
      device.count++;
    } else {
      this._Bsdevices.push({ deviceId, count: 1 });
    }
  
    this._totalPrice += this.getDeviceById(deviceId).price;
  }

  removeDevice(deviceId) {
    const index = this._Bsdevices.findIndex((d) => d.id === deviceId);

    if (index !== -1) {
      const device = this._Bsdevices[index];
      this._totalPrice -= device.price * this._Bsdevices[index].count;
      this._Bsdevices.splice(index, 1);
    }
  }

  clearBasket() {
    this._Bsdevices = [];
    this._totalPrice = 0;
  }

  get devices() {
    return this._Bsdevices;
  }

  get totalPrice() {
    return this._totalPrice;
  }
}