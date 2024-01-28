import React, { useEffect, useState } from 'react';
import { Table } from 'antd';
import { DeleteProductSell } from '../../../api/Product';
import { PROD_REPORT_COL, deleteComponent } from '../utils';
import { deleteItem, fetchSoldProducts } from '../../../api/utils';


const ListProductSold = () => {

    const [data, setData] = useState([]);
    const [refresh, setRefresh] = useState(false);
    const [showConfirmDelete, setConfirmDelete] = useState(false);
    const [isDeleting, setDeleting] = useState(false);
    const [id, setId] = useState(0);

    const handleDelete = () => {
        deleteItem(
            setDeleting,
            setRefresh,
            refresh, id,
            DeleteProductSell
        )
    }

    const confirmDelete = (id) => {
        setId(id);
        setConfirmDelete(true);
    }

    useEffect(() => {
        fetchSoldProducts(setData);
    }, [refresh]);

    const deleteComp = (record) => {
        return deleteComponent(
            record, id,
            showConfirmDelete,
            isDeleting, confirmDelete,
            setConfirmDelete, handleDelete)
    }

    return (
        <div>
            <Table
                columns={PROD_REPORT_COL(deleteComp)}
                size="small"
                dataSource={data}
            />
        </div>
    );
}

export default ListProductSold;