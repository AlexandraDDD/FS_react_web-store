import { action, makeAutoObservable } from "mobx";
import { createDevice, fetchDevicesReq, updateDevice } from "../API/deviceAPI";

export default class DeviceStore {
  constructor() {
    this._devices = [];
    this._selectedType = {};
    this._selectedBrand = {};
    this._page = 1;
    this._totalCount = 0;
    this._limit = 5;
    this._searchQuery = "";

    makeAutoObservable(this);
  }

  fetchDevices = action(async () => {
    const response = await fetchDevicesReq(this._selectedBrand.id, this._selectedType.id, this._limit, this._page);
    this._devices = response.rows;
    this._totalCount = response.count;
  });

  createDevice = action(async (device) => {
    const newDevice = await createDevice(device);
    this._devices.push(newDevice);
    this._totalCount += 1;
  });

  updateDevice = action(async (id, device) => {
    const updatedDevice = await updateDevice(id, device);
    const index = this._devices.findIndex((device) => device.id === id);
    if (index !== -1) {
      this._devices[index] = updatedDevice;
    }
  });

  setSearchQuery(query) {
    this._searchQuery = query;
  }

  get searchQuery() {
    return this._searchQuery;
  }
  setSelectedType(type) {
    this._page = 1;
    this._selectedType = type;
  }

  setSelectedBrand(brand) {
    this._page = 1;
    this._selectedBrand = brand;
  }

  setPage(page) {
    this._page = page;
  }

  setLimit(limit) {
    this._limit = limit;
  }

  get devices() {
    return this._devices;
  }

  get selectedType() {
    return this._selectedType;
  }

  get selectedBrand() {
    return this._selectedBrand;
  }

  get page() {
    return this._page;
  }

  get totalCount() {
    return this._totalCount;
  }

  get limit() {
    return this._limit;
  }
}
