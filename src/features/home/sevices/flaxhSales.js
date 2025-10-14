import useGetQuery from "../../../api/halper/useGetQuery"

const API = {
    GET:'/products',
    GET_ONE:'/products/',
    UPDATE:'/products',
    DELETE:'/products',
    ADD:'/products'
}
const KEY= "products"

export const useGetFlashSales = (params, options) => useGetQuery(KEY, API.GET, params, options)


