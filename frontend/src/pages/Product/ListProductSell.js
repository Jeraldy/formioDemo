import React, { useEffect, useState } from 'react';
import { Table, Button, Input } from 'antd';
import { GetProducts } from '../../api/Product';
import { PROD_SELL_COL } from './utils';
import ShoppingCart from '../ShoppingCart';
const { Search } = Input;

const ListProductSell = () => {

    const [data, setData] = useState([]);
    const [keywords, setKeywords] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedItems, setItems] = useState([]);

    const rowSelection = {
        selectedRowKeys: selectedItems.map(p => p.name),
        onChange: (_, d) => setItems(d)
    };

    useEffect(() => {
        const fetchData = async () => {
            const response = await GetProducts();
            if (response?.data) {
                const d = response.data.map((k, i) => {
                    return {
                        ...k, index: i + 1, key: k.name,
                        qty: 1,
                        total: k.sellingPrice
                    }
                })
                setData(d);
            }
        }
        fetchData();
    }, []);

    const filter = () => {
        return data.filter(d => JSON.stringify(d).includes(keywords || ''))
    }

    return (
        <div>
            <div style={{ display: "flex", justifyContent: "space-between", paddingRight: "10px", }}>
                <Button
                    type="primary"
                    onClick={() => setIsModalOpen(true)}
                    disabled={!selectedItems.length}
                >
                    Cart({selectedItems.length})
                </Button>
                <Search
                    placeholder="Search"
                    onChange={(e) => setKeywords(e.target.value)}
                    style={{ width: 200 }}
                />
            </div>
            <Table
                columns={PROD_SELL_COL()}
                size="small"
                dataSource={filter()}
                rowSelection={{ ...rowSelection }}
            />
            <ShoppingCart
                dataSource={selectedItems}
                isOpen={isModalOpen}
                toggleModel={setIsModalOpen}
                setItems={setItems}
            />
        </div>
    );
}

export default ListProductSell;