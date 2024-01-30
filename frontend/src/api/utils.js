import { message, notification } from "antd";
import { GetProductCategory, GetProductSell, GetProductSubCategory, GetProducts } from "./Product";

export const fetchSoldProducts = async (callback, params, keywords='') => {
    const query = new URLSearchParams(params).toString()
    const response = await GetProductSell(query);
    if (response?.data) {
        const d = response.data
            .filter(k => k.productId != null)
            .filter(row => JSON.stringify(row).includes(keywords))
            .map((k, i) => {
                const totalSellingPrice = (k.quantity * k.sellingPrice)
                const totalBuyingPrice = (k.quantity * k.productId.buyingPrice)
                return {
                    ...k.productId,
                    _id: k._id,
                    quantity: k.quantity,
                    total: totalSellingPrice,
                    profit: (totalSellingPrice - totalBuyingPrice),
                    index: i + 1,
                    key: k.name,
                    createdAt: k.createdAt
                }
            })
        callback(d)
    }
}

export const deleteItem = async (setDeleting, setRefresh, refresh, id, deleteFun) => {
    setDeleting(true);
    try {
        const request = await deleteFun(id);
        if (request.status === "success") {
            setRefresh(!refresh);
            notification.open({
                message: "Deleted succefully",
                placement: 'top'
            })
        } else {
            message.error(request.message)
        }
    } catch (ex) {
        console.log(ex)
    }
    setDeleting(false);
}

export const fetchProductCategory = async (callback, params) => {
    const response = await GetProductCategory();
    if (response?.data) {
        const d = response.data.map((k, i) => {
            return { ...k, index: i + 1, key: k.name, value: k.name }
        })
        callback(d)
    }
}

export const fetchProducts = async (setData, params) => {
    const response = await GetProducts();
    if (response?.data) {
        const d = response.data.map((k, i) => {
            return { ...k, index: i + 1, key: k.name, value: k.name }
        })
        setData(d)
    }
}

export const fetchProductSubCategory = async (setData, params) => {
    const response = await GetProductSubCategory();
    if (response?.data) {
        const d = response.data.map((k, i) => {
            return {
                ...k, index: i + 1,
                key: k.name, category: k.categoryId.name
            }
        })
        setData(d);
    }
}

export const fetchDynamic = async (callback, func) => {
    const response = await func();
    if (response?.data) {
        const d = response.data.map((k) => {
            return { value: k.name, key: k._id }
        })
        callback(d);
    }
}