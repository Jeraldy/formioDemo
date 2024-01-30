import React, { useEffect, useState } from 'react';
import { AutoComplete, Button, DatePicker, Select, Table } from 'antd';
import { DeleteProductSell, GetProductCategory, GetProductSubCategory, GetProducts } from '../../../api/Product';
import { PROD_REPORT_COL, deleteComponent } from '../utils';
import { deleteItem, fetchDynamic, fetchSoldProducts } from '../../../api/utils';
import { SearchOutlined } from '@ant-design/icons';
import { startOfDay, startOfWeek, startOfMonth, endOfMonth, endOfDay, endOfWeek, lightFormat } from "date-fns";

const { RangePicker } = DatePicker;
const { Option } = Select

const selectOptions = ["To Day", "This Week", "This Month", "Date Range"]
const selectCriteria = [
    { value: "All Products" },
    { value: "Product Name", func: GetProducts },
    { value: "Category Name", func: GetProductCategory },
    { value: "Sub Category Name", func: GetProductSubCategory }
]

const ListProductSold = () => {

    const [data, setData] = useState([]);
    const [refresh, setRefresh] = useState(false);
    const [showConfirmDelete, setConfirmDelete] = useState(false);
    const [isDeleting, setDeleting] = useState(false);
    const [id, setId] = useState(0);
    const [criteria, setCriteria] = useState([]);

    const [searchValues, setSearchValues] = useState({
        select: selectOptions[0],
        criteria: selectCriteria[0].value,
        dateRange: null,
        keywords: ''
    });

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
        handleSearch();
    }, [refresh]);

    useEffect(() => {
        if (searchValues.criteria !== selectCriteria[0].value) {
            const func = selectCriteria
                .filter(v => v.value === searchValues.criteria)[0].func;
            fetchDynamic(setCriteria, func);
        }
    }, [searchValues.criteria]);

    const deleteComp = (record) => {
        let date = new Date(Date.parse(record.createdAt)).setHours(0, 0, 0, 0);
        var todaysDate = new Date().setHours(0, 0, 0, 0);
        if (date < todaysDate) {
            return '-'
        }
        return deleteComponent(
            record, id,
            showConfirmDelete,
            isDeleting, confirmDelete,
            setConfirmDelete, handleDelete)
    }

    const handleSearch = () => {
        const query = {}
        const date = Date.now()
        const dateRange = searchValues.dateRange || [startOfDay(date), endOfDay(date)];
        let [start, end] = dateRange
        if (searchValues.select !== "Date Range") {
            if (searchValues.select === "To Day") {
                start = startOfDay(date);
                end = endOfDay(date);
            }

            if (searchValues.select === "This Week") {
                start = startOfWeek(date, { weekStartsOn: 1 });
                end = endOfWeek(date, { weekStartsOn: 1 });
            }

            if (searchValues.select === "This Month") {
                start = startOfMonth(date);
                end = endOfMonth(date);
            }
            let format = "yyyy-MM-dd'T'HH:MM:ss";
            start = lightFormat(start, format);
            end = lightFormat(end, format);
        }
        query[`createdAt[gt]`] = start;
        query[`createdAt[lt]`] = end;
        fetchSoldProducts(setData, query, searchValues.keywords);
    }

    return (
        <div>
            <div style={{ padding: '4px', display: 'flex', justifyContent: 'flex-end', gap: '4px', flexWrap: "wrap" }}>
                <Select value={searchValues.select}
                    style={{ width: "120px" }}
                    onChange={(value) => setSearchValues({
                        ...searchValues,
                        select: value
                    })}
                >
                    {selectOptions.map(value => (<Option value={value} key={value}>{value}</Option>))}
                </Select>
                {searchValues.select === "Date Range" && (
                    <RangePicker
                        onChange={(values) => setSearchValues({
                            ...searchValues,
                            dateRange: values
                        })}
                    />
                )}
                <Select value={searchValues.criteria}
                    style={{ width: "200px" }}
                    onChange={(value) => setSearchValues({
                        ...searchValues,
                        criteria: value
                    })}
                >
                    {selectCriteria.map(c => (<Option value={c.value} key={c.value}>{c.value}</Option>))}
                </Select>
                {searchValues.criteria !== "All Products" && (
                    <AutoComplete
                        style={{ width: 200 }}
                        options={criteria}
                        placeholder={searchValues.criteria}
                        filterOption={(inputValue, option) =>
                            option.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
                        }
                        onChange={(value) => setSearchValues({
                            ...searchValues,
                            keywords: criteria.filter(item => item.value === value)[0]?.key || ''
                        })}
                    />
                )}
                <Button
                    type="primary"
                    shape="circle" icon={<SearchOutlined />}
                    onClick={handleSearch}
                />
            </div>
            <Table
                columns={PROD_REPORT_COL(deleteComp)}
                size="small"
                dataSource={data}
                bordered
                summary={() => {
                    const totalSales = data.reduce((a, b) => a + b.total, 0);
                    const totalProfit = data.reduce((a, b) => a + b.profit, 0);
                    return (
                        <>
                            <Table.Summary.Row style={{ fontWeight: 'bold', textAlign: 'right' }}>
                                <TCell data={"TOTAL"} colSpan={4} />
                                <TCell data={totalSales.toLocaleString()} />
                                <TCell data={totalProfit.toLocaleString()} />
                            </Table.Summary.Row>
                        </>
                    );
                }}
                scroll={{ x: 'calc(700px + 50%)'}}
            />
        </div>
    );
}

const TCell = ({ data, colSpan = 1 }) => {
    return (
        <Table.Summary.Cell colSpan={colSpan}> {data}</Table.Summary.Cell>
    )
}

export default ListProductSold;