import React, { useEffect, useState } from 'react';
import { Table, Button, Popconfirm, notification, message } from 'antd';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { DeleteProductSubCategory, GetProductSubCategory } from '../../api/Product';
import { PROD_SUB_CATEGORY_COL } from './utils';
import AddNewProductSubCategory from './AddNewProductSubCategory';

const ListProductSubCategory = () => {

    const [data, setData] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [refresh, setRefresh] = useState(false);
    const [showConfirmDelete, setConfirmDelete] = useState(false);
    const [isDeleting, setDeleting] = useState(false);
    const [subCategory, setSelectedSubCategory] = useState();
    const [id, setId] = useState(0);

    const showModal = () => {
        setIsModalOpen(!isModalOpen);
    };

    const handleDelete = async () => {
        setDeleting(true);
        try {
            const request = await DeleteProductSubCategory(id);
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
            const response = await GetProductSubCategory();
            if (response?.data) {
                const d = response.data.map((k, i) => {
                    return {
                        ...k, index: i + 1,
                        key: k.name, category: k.categoryId.name
                    }
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

    const handleEdit = (record) => {
        setSelectedSubCategory(record);
        showModal();
    }

    const editComp = (r) => {
        return (
            <Button type="link" onClick={() => handleEdit(r)}><EditOutlined /></Button>
        )
    }

    return (
        <div>
            <Button type="primary" onClick={showModal}>
                Add
            </Button>
            <Table
                columns={PROD_SUB_CATEGORY_COL(deleteComp, editComp)}
                size="small"
                dataSource={data}
            />
            <AddNewProductSubCategory
                isOpen={isModalOpen}
                toggleModel={showModal}
                refresh={() => setRefresh(!refresh)}
                subCategory={subCategory}
            />
        </div>
    );
}

export default ListProductSubCategory;