import { message, notification } from "antd";
import { GetProductSell } from "./Product";

export const fetchSoldProducts = async (callback, params) => {
    const response = await GetProductSell();
    if (response?.data) {
        const d = response.data
            .filter(k => k.productId != null)
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