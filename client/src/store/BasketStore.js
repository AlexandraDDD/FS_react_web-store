import { action, makeAutoObservable } from "mobx";
import { addDeviceReq, fetchBasketReq, removeDeviceReq } from "../API/BasketAPI";

export default class BasketStore {
  constructor() {
    this._Bsdevices = [];
    this._totalPrice = 0;
    this._count = 0;
    this._BScount = 0;

    makeAutoObservable(this);
  }

  setTotalPrice(totalPrice) {
    this._totalPrice = totalPrice;
  }
  setDevices(Bsdevices) {
    this._Bsdevices = Bsdevices;
  }

  fetchBasket = action(async () => {
    const response = await fetchBasketReq();
    this._Bsdevices = response;

    this.calculateTotalCount();
/*     this.calculateTotalPrice(); */
  });


  async addDevice(deviceId) {
    const response = await addDeviceReq({ deviceId, count: 1 });
    if (response.status === 200) {
      const device = this._Bsdevices.find((d) => d.deviceId === deviceId);

      if (device) {
        device.count++;
      } else {
        this._Bsdevices.push({ deviceId, count: 1 });
      }

      this._totalPrice += this.getDeviceById(deviceId).price;
      this._BScount++;
    }
  }
// не уменьшает на единицу на сервере
  async removeDevice(deviceId) {
    const index = this._Bsdevices.findIndex((d) => d.deviceId === deviceId);
  
    if (index !== -1) {
      const device = this._Bsdevices[index];
  
      if (device.count > 1) {
        device.count--;
        this._totalPrice -= device.price;
        this._count--;
      } else {
        const response = await removeDeviceReq(deviceId);
        if (response.status === 200) {
          this._totalPrice -= device.price;
          this._count--;
          this._Bsdevices.splice(index, 1);
        }
      }
  
      this._BScount--;
    }
  }
  
  calculateTotalCount() {
    let totalCount = 0;
    this._Bsdevices.forEach((device) => {
      totalCount += device.count;
    });
    this._BScount = totalCount;
  }

  /* calculateTotalPrice() {
    let totalPrice = 0;
    this._Bsdevices.forEach((device) => {
      totalPrice += device.price * device.count;
    });
    this._totalPrice = totalPrice;
  } */

  clearBasket() {
    this._Bsdevices = [];
    this._totalPrice = 0;
    this._count = 0;
    this._BScount = 0;
  }

  get devices() {
    return this._Bsdevices;
  }

  get totalPrice() {
    return this._totalPrice;
  }

  get BScount() {
    return this._BScount;
  }
}
