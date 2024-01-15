import React, { useEffect, useState } from 'react';
import { Table, Button, Popconfirm, notification, message } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import { DeleteProductCategory, GetProductCategory } from '../../api/Product';
import { PROD_CATEGORY_COL } from './utils';
import AddNewProductCategory from './AddNewProductCategory';


const ListProductCategory = () => {

    const [data, setData] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [refresh, setRefresh] = useState(false);
    const [showConfirmDelete, setConfirmDelete] = useState(false);
    const [isDeleting, setDeleting] = useState(false);
    const [id, setId] = useState(0);

    const showModal = () => {
        setIsModalOpen(!isModalOpen);
    };

    const handleDelete = async () => {
        setDeleting(true);
        try {
            const request = await DeleteProductCategory(id);
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

    const confirmDelete = (id) => {
        setId(id);
        setConfirmDelete(true);
    }

    useEffect(() => {
        const fetchData = async () => {
            const response = await GetProductCategory();
            if (response.data) {
                const d = response.data.map((k, i) => {
                    return { ...k, index: i + 1, key: k.name }
                })
                setData(d)
            }
        }
        fetchData();
    }, [refresh]);

    const deleteComp = (r) => {
        return (
            <Popconfirm
                title="Delete"
                description="Are you sure?"
                open={showConfirmDelete && r._id === id}
                onConfirm={handleDelete}
                okButtonProps={{ loading: isDeleting, }}
                onCancel={() => setConfirmDelete(false)}
            >
              
              <Button type="link" onClick={() => confirmDelete(r._id)}><DeleteOutlined /></Button>
            </Popconfirm>
        )
    }

    return (
        <div>
            <Button type="primary" onClick={showModal}>
                Add
            </Button>
            <Table
                columns={PROD_CATEGORY_COL(deleteComp)}
                size="small"
                dataSource={data}
            />
            <AddNewProductCategory
                isOpen={isModalOpen}
                toggleModel={showModal}
                refresh={() => setRefresh(!refresh)}
            />
        </div>
    );
}

export default ListProductCategory;