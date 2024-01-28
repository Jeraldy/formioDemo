import React, { useEffect, useState } from 'react';
import { Table } from 'antd';
import { deleteComponent } from '../utils';
import { deleteItem } from '../../../api/utils';

const ListBasePage = ({
    colums,
    deleteHandler,
    fetchHandler,
    pageHeader
}) => {

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
            deleteHandler
        )
    }

    const confirmDelete = (id) => {
        setId(id);
        setConfirmDelete(true);
    }

    useEffect(() => {
        fetchHandler(setData);
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
            {pageHeader}
            <Table
                columns={colums(deleteComp)}
                size="small"
                dataSource={data}
            />
        </div>
    );
}

export default ListBasePage;