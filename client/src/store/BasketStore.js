import { action, makeAutoObservable } from "mobx";
import { addDeviceReq, fetchBasketReq, removeDeviceReq } from "../API/BasketAPI";

export default class BasketStore {
  constructor() {
    this._Bsdevices = []; //товары модели basketdevice
    this._BScount = 0; //кол-во товаров в корзине

    makeAutoObservable(this);
  }

  setTotalPrice(totalPrice) {
    this._totalPrice = totalPrice;
  }

  fetchBasket = action(async () => {
    const response = await fetchBasketReq();
    this._Bsdevices = response;

    this.calculateTotalCount();
  });


  async addDevice(deviceId) {
    const res = await addDeviceReq({ deviceId, count: 1 });
    const device = this._Bsdevices.find((d) => d.deviceId === deviceId);
    if (device) {
      device.count++;
    } else {
      this._Bsdevices.push({ deviceId: deviceId, count: 1 });
    }

    this._BScount++;
  }
  // не уменьшает на единицу на сервере
  async removeDevice(deviceId) {
    const index = this._Bsdevices.findIndex((d) => d.deviceId === deviceId);
    if (index !== -1) {
      const device = this._Bsdevices[index];
      const response = await removeDeviceReq(deviceId);
      device.count--;
      
      if(device.count == 0){
        this._Bsdevices.splice(index, 1);
      }
     



    }
    this._BScount--;
  }

  calculateTotalCount() {
    let totalCount = 0;
    this._Bsdevices.forEach((device) => {
      totalCount += device.count;
    });
    this._BScount = totalCount;
  }

  clearBasket() {
    this._Bsdevices = [];
    this._BScount = 0;
  }

  get devices() {
    return this._Bsdevices;
  }

  get BScount() {
    return this._BScount;
  }
}
