import { action, makeAutoObservable } from "mobx";
import { createBrandReq, fetchBrandsReq, removeBrandReq } from "../API/BrandAPI";

export default class BrandStore {
    constructor() {
        this._brands = [];
        makeAutoObservable(this);
    }

    fetchBrands = action(async () => {
        this._brands = await fetchBrandsReq();
    })

    async createBrand(brand) {
        const newBrand = await createBrandReq(brand);
        this._brands.push(newBrand);
    }

    async removeBrand(id) {
        await removeBrandReq(id);
        this._brands = this._brands.filter(brand => brand.id !== id);
    }

    get brands() {
        return this._brands;
    }
}
