import { $authhost } from ".";

export const createType = async (type) => {
    const {data} = await $authhost.post('api/type/', type)
    return data
}
export const fetchTypes = async () => {
    const {data} = await $authhost.get('api/type/')
    return data
}

export const removeType = async (id) => {
    const {data} = await $authhost.delete('api/type/'+ id)
    return data
}
