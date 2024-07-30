import { makeAutoObservable } from 'mobx';

export default class ModalsStore {
    deviceModalVisible = false;
    typeModalVisible = false;
    brandModalVisible = false;

    constructor() {
        makeAutoObservable(this);
    }

    setDeviceModalVisible(visible) {
        this.deviceModalVisible = visible;
    }

    setTypeModalVisible(visible) {
        this.typeModalVisible = visible;
    }

    setBrandModalVisible(visible) {
        this.brandModalVisible = visible;
    }
}


