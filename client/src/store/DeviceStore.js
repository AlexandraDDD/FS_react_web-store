import { makeAutoObservable } from "mobx";

export default class DeviceStore {
    constructor() {
        this._types = []
        this._brands = []
        this._devices = []

        this._user = {}

        this._selectedType = {}
        this._selectedBrand = {}

        this._page = 1
        this._totalCount = 0
        this._limit = 3


        makeAutoObservable(this)
    }
    setPage(page) {
        console.log(page);
        this._page = page
    }
    setTotalCount(totalCount) {
        this._totalCount = totalCount
    }
    setLimit(limit) {
        this._limit = limit
    }
    setTypes(types) {
        this._types = types
    }
    setBrands(brands) {
        this._brands = brands
    }
    setDevices(devices) {
        this._devices = devices
    }
    setSelectedType(type) {
        this._page = 1
        this._selectedType = type
    }
    setSelectedBrand(brand) {
        this._page = 1
        this._selectedBrand = brand
    }
    setInfo(brand) {
        this._page = 1
        this._selectedBrand = brand
    }
    updateDevice(updatedDevice) {
        const index = this._devices.findIndex(device => device.id === updatedDevice.id);
        if (index !== -1) {
            this._devices[index] = updatedDevice;
        }
    }
    get selectedBrand() {
        return this._selectedBrand
    }
    get selectedType() {
        return this._selectedType
    }
    get types() {
        return this._types
    }
    get brands() {
        return this._brands
    }
    get devices() {
        return this._devices
    }
    get page() {
        return this._page
    }
    get totalCount() {
        return this._totalCount
    }
    get limit() {
        return this._limit
    }

}