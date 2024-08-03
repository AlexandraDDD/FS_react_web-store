import { action, makeAutoObservable } from "mobx";
import { createTypeReq, fetchTypesReq, removeTypeReq } from "../API/TypesAPI";

export default class TypeStore {
    constructor() {
        this._types = [];
        makeAutoObservable(this);
    }

    fetchTypes = action(async () => {
        this._types = await fetchTypesReq();
    })

    async createType(type) {
        const newType = await createTypeReq(type);
        this._types.push(newType);
    }

    async removeType(id) {
        await removeTypeReq(id);
        this._types = this._types.filter(type => type.id !== id);
    }

    get types() {
        return this._types;
    }
}
