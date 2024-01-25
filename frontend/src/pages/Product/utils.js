
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
            render: (r) => parseInt(r).toLocaleString()
        },
        {
            title: 'Sell.Price',
            dataIndex: 'sellingPrice',
            key: 'sellingPrice',
            render: (r) => parseInt(r).toLocaleString()
        }, {
            title: 'Qty.',
            dataIndex: 'quantity',
            key: 'quantity',
            render: (r) => parseInt(r).toLocaleString()
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
            render: (r) => parseInt(r).toLocaleString()
        }, {
            title: 'Stock',
            dataIndex: 'quantity',
            key: 'quantity',
            render: (r) => parseInt(r).toLocaleString()
        }
    ];
    return columns;
}
