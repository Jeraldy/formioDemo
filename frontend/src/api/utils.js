import { message, notification } from "antd";
import FormsApi from "./FormsApi";


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


export const fetchForms = async (setData, params) => {
    const response = await FormsApi.GetAll();
    if (response?.data) {
        const d = response.data.map((k, i) => {
            return { ...k, index: i + 1, key: k._id }
        })
        setData(d)
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