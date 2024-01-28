import { DeleteOutlined } from "@ant-design/icons";
import { Button, Popconfirm } from "antd";

export const PROD_CATEGORY_COL = (handleDelete, handleEdit) => [
    {
        title: '#',
        dataIndex: 'index',
        key: 'index',
    },
    {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
    },
    {
        key: 'y',
        render: (r) => handleEdit(r)
    },
    {
        key: 'x',
        render: (r) => handleDelete(r)
    },
];


export const PROD_SUB_CATEGORY_COL = (handleDelete, handleEdit) => [
    {
        title: '#',
        dataIndex: 'index',
        key: 'index',
    },
    {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
    },
    {
        title: 'Category',
        dataIndex: 'category',
        key: 'category',
    },
    {
        key: 'y',
        render: (r) => handleEdit(r)
    },
    {
        key: 'x',
        render: (r) => handleDelete(r)
    },
];


export const PROD_COL = (handleDelete, handleEdit) => {
    let columns = [
        {
            title: '#',
            dataIndex: 'index',
            key: 'index',
        },
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Buy.Price',
            dataIndex: 'buyingPrice',
            key: 'buyingPrice',
            render: (r) => formatMoney(r)
        },
        {
            title: 'Sell.Price',
            dataIndex: 'sellingPrice',
            key: 'sellingPrice',
            render: (r) => formatMoney(r)
        }, {
            title: 'Qty.',
            dataIndex: 'quantity',
            key: 'quantity',
            render: (r) => formatMoney(r)
        },
    ];
    if (handleEdit) {
        columns.push({
            key: 'y',
            render: (r) => handleEdit(r)
        })
    }
    if (handleDelete) {
        columns.push({
            key: 'x',
            render: (r) => handleDelete(r)
        })
    }
    return columns;
}


export const PROD_SELL_COL = (handleDelete) => {
    const columns = [
        {
            title: '#',
            dataIndex: 'index',
            key: 'index',
        },
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Price',
            dataIndex: 'sellingPrice',
            key: 'sellingPrice',
            render: (r) => formatMoney(r)
        }, {
            title: 'Stock',
            dataIndex: 'quantity',
            key: 'quantity',
            render: (r) => formatMoney(r)
        },
    ];
    return columns;
}

export const PROD_REPORT_COL = (handleDelete) => {
    const columns = [
        {
            title: '#',
            dataIndex: 'index',
            key: 'index',
        },
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Price',
            dataIndex: 'sellingPrice',
            key: 'sellingPrice',
            render: (r) => formatMoney(r)
        }, {
            title: 'Stock',
            dataIndex: 'quantity',
            key: 'quantity',
            render: (r) =>formatMoney(r)
        },
        {
            title: 'Total Sales',
            dataIndex: 'total',
            key: 'total',
            render: (r) => formatMoney(r)
        },
        {
            title: 'Total Profit',
            dataIndex: 'profit',
            key: 'profit',
            render: (r) => formatMoney(r)
        },
        {
            title: 'createdAt',
            dataIndex: 'createdAt',
            key: 'createdAt',
            render: (r) => formatDMY(r)
        },
        {
            key: 'delete',
            render: (r) => handleDelete(r)
        }
    ];
    return columns;
}

const formatDMY = (date) => {
    const d = date.split("T")[0].split("-")
    return `${d[2]}/${d[1]}/${d[0]}`;
}

const formatMoney = (r)=>{
    return (
        <div style={{textAlign: "right"}}>{ parseInt(r).toLocaleString()}</div>
    )
}

export const deleteComponent = (record, id, showConfirmDelete, isDeleting, confirmDelete, setConfirmDelete, handleDelete) => {
    return (
        <Popconfirm
            title="Delete"
            description="Are you sure?"
            open={showConfirmDelete && record._id === id}
            onConfirm={handleDelete}
            okButtonProps={{ loading: isDeleting, }}
            onCancel={() => setConfirmDelete(false)}
        >
            <Button type="link" onClick={() => confirmDelete(record._id)}><DeleteOutlined /></Button>
        </Popconfirm>
    )
}