
export const PROD_CATEGORY_COL = (handleDelete) => [
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
        title: '',
        dataIndex: '',
        key: 'x',
        render: (r) => handleDelete(r)
    },
];


export const PROD_SUB_CATEGORY_COL = (handleDelete) => [
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
        title: '',
        dataIndex: '',
        key: 'x',
        render: (r) => handleDelete(r)
    },
];


export const PROD_COL = (handleDelete) => [
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
    },{
        title: 'Qty.',
        dataIndex: 'quantity',
        key: 'quantity',
        render: (r) => parseInt(r).toLocaleString()
    },
    {
        title: '',
        dataIndex: '',
        key: 'x',
        render: (r) => handleDelete(r)
    },
];