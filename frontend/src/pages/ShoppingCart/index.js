import React, { useState } from 'react';
import { Table, Modal, notification, message } from 'antd';
import { EditableCell, SHOPPING_CART } from './common';
import { CreateProductSell } from '../../api/Product';

const okButtonProps = {
    htmlType: "submit",
    form: "form"
}

const ShoppingCart = ({ dataSource, isOpen, toggleModel, setItems }) => {

    const [isCreating, setCreating] = useState(false);

    const components = {
        body: { cell: EditableCell },
    };

    const handleDelete = (key) => {
        const newData = dataSource.filter((item) => item.key !== key);
        setItems(newData);
    };

    const handleSave = (row) => {
        const newData = [...dataSource];
        const index = newData.findIndex((item) => row.key === item.key);
        const item = newData[index];
        newData.splice(index, 1, { ...item, ...row, total: row.qty * row.sellingPrice });
        setItems(newData);
    };

    const columns = SHOPPING_CART(handleDelete, dataSource).map((col) => {
        if (!col.editable) {
            return col;
        }
        return {
            ...col,
            onCell: (record) => ({
                record,
                editable: col.editable,
                dataIndex: col.dataIndex,
                title: col.title,
                handleSave,
            }),
        };
    });

    const onFinish = async () => {
        if (dataSource.length) {
            setCreating(true);
            try {
                const form = dataSource.map(p => ({
                    productId: p._id,
                    sellingPrice: p.sellingPrice,
                    quantity: p.qty
                }));
                const request = await CreateProductSell(form);
                if (request.status === "success") {
                    setItems([])
                    toggleModel(false);
                    notification.open({
                        message: "Sold succefully",
                        placement: 'top'
                    })
                } else {
                    message.error(request.message)
                }
            } catch (ex) {
                console.log(ex)
            }
            setCreating(false);
        }
    }

    const total = dataSource.reduce((a, b) => a + b.total, 0)

    return (
        <Modal
            title="Sell Product(s)"
            open={isOpen}
            onOk={() => onFinish()}
            okText="Sell"
            onCancel={() => toggleModel(false)}
            okButtonProps={okButtonProps}
            confirmLoading={isCreating}
        >
            <Table
                components={components}
                rowClassName={() => 'editable-row'}
                bordered
                dataSource={dataSource}
                columns={columns}
            />
            <strong>Total Price: TZS {total.toLocaleString()}/= </strong>
        </Modal>
    );
}

export default ShoppingCart;