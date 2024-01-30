import React, { useEffect, useState } from 'react';
import { Table, Button, Popconfirm, notification, message } from 'antd';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { DeleteProduct } from '../../../api/Product';
import { PROD_COL } from '../utils';
import AddNewProduct from '../Forms/AddNewProduct';
import { fetchProducts } from '../../../api/utils';


const ListProduct = () => {

    const [data, setData] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [refresh, setRefresh] = useState(false);
    const [showConfirmDelete, setConfirmDelete] = useState(false);
    const [isDeleting, setDeleting] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState();
    const [id, setId] = useState(0);

    const showModal = () => {
        setIsModalOpen(!isModalOpen);
    };

    const handleDelete = async () => {
        setDeleting(true);
        try {
            const request = await DeleteProduct(id);
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
        setSelectedProduct(null);
        fetchProducts(setData)
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

    const handleEdit = (product)=>{
        setSelectedProduct(product);
        showModal();
    }

    const editComp = (r) => {
        return (
            <Button type="link" onClick={() => handleEdit(r)}><EditOutlined /></Button>
        )
    }

    return (
        <div>
            <div style={{
                display: "flex",
                justifyContent: "space-between",
                paddingRight: "10px",
            }}>
                <Button type="primary" onClick={showModal}>
                    Add
                </Button>
            </div>
            <Table
                columns={PROD_COL(deleteComp, editComp)}
                size="small"
                dataSource={data}
                bordered
            />
            <AddNewProduct
                isOpen={isModalOpen}
                toggleModel={showModal}
                refresh={() => setRefresh(!refresh)}
                product={selectedProduct}
            />
        </div>
    );
}

export default ListProduct;