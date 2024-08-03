import { action, makeAutoObservable } from "mobx";
import { fetchDevicesReq } from "../API/deviceAPI";

export default class DeviceStore {
  constructor() {
    this._devices = [];
    this._selectedType = {};
    this._selectedBrand = {};
    this._page = 1;
    this._totalCount = 0;
    this._limit = 3;
    this._searchQuery = "";

    makeAutoObservable(this);
  }

  fetchDevices = action(async () => {
    const response = await fetchDevicesReq(this._selectedBrand.id, this._selectedType.id, this._limit, this._page);
    this._devices = response.rows;
    this._totalCount = response.count;
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
