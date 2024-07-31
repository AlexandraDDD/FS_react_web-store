import { makeAutoObservable } from 'mobx';

export default class EditStore {


    constructor() {
        this._selectDevice = null;
        makeAutoObservable(this);
    }

    setSelectDevice(device) {
        this._selectDevice = device;
    }
    get selectDevice() {
        return this._selectDevice
    }
}
