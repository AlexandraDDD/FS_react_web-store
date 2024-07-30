import { $authhost} from ".";

export const createBrand = async (brand) => {
    const {data} = await $authhost.post('api/brand/', brand)
    return data
}
export const fetchBrands = async () => {
    const {data} = await $authhost.get('api/brand/')
    return data
}

export const removeBrand = async (id) => {
    const {data} = await $authhost.delete('api/brand/'+ id)
    return data
}
