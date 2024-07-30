import { makeAutoObservable } from 'mobx';

export default class EditStore {


    constructor() {
        this._deviceToEdit = null;
        makeAutoObservable(this);
    }

    setDeviceToEdit(device) {
        this._deviceToEdit = device;
    }
    get deviceToEdit() {
        return this._deviceToEdit
    }
}
