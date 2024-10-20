import React, { useEffect, useState } from 'react';
import { Modal, List, message, Button, notification } from 'antd';
import ReactJson from 'react-json-view'
import FormDataApi from '../api/FormDataApi';
import { DeleteOutlined } from '@ant-design/icons';


const ViewFormData = ({ isOpen, toggleModel, id }) => {
    const [data, setData] = useState([]);
    const [refresh, setRefresh] = useState(0);

    useEffect(() => {
        if (id) {
            const fetchFormData = async () => {
                const response = await FormDataApi.GetAll(`formId=${id}`);
                const data = response?.data
                if (data) {
                    setData(data);
                }
            }
            fetchFormData();
        }
    }, [id, setData, refresh]);


    const handleDelete = async (dataId) => {
        try {
            const request = await FormDataApi.DeleteOne(dataId);
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
    }


    const deleteComp = (r) => {
        return (
            <Button type="link" onClick={() => handleDelete(r._id)}>
                <DeleteOutlined />
            </Button>
        )
    }

    return (
        <Modal
            title="Submitted Form Data"
            open={isOpen}
            onOk={toggleModel}
            onCancel={toggleModel}
        >
            <List
                pagination={{ position: 'bottom', pageSize: 5 }}
                size="small"
                bordered
                dataSource={data}
                renderItem={(item) => <List.Item
                    actions={[deleteComp(item)]}
                >
                    <ReactJson collapsed={true} src={JSON.parse(item.formDataObject)} /></List.Item>}
            />
        </Modal>
    );
};

export default ViewFormData;