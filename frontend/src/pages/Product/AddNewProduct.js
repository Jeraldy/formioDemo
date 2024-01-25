import React, { useEffect, useState } from 'react';
import { Form, Input, InputNumber, Modal, Select, message, notification } from 'antd';
import { CreateProduct, GetProductCategory, GetProductSubCategory, UpdateProduct } from '../../api/Product';

const { Option } = Select

const okButtonProps = {
    htmlType: "submit",
    form: "form"
}

const AddNewProduct = ({ isOpen, toggleModel, refresh, product }) => {

    const [form] = Form.useForm();
    const [categories, setCategory] = useState([]);
    const [subCategories, setSubCategory] = useState([]);
    const [isCreating, setCreating] = useState(false);

    useEffect(() => {
        if (product) {
            form.setFieldsValue(product);
            handleCategoryChange(product.categoryId)
        }
    }, [product])

    useEffect(() => {
        const fetchCategory = async () => {
            const response = await GetProductCategory();
            if (response?.data) {
                setCategory(response.data);

            }
        }
        fetchCategory();
    }, []);

    const handleCategoryChange = async (categoryId) => {
        const response = await GetProductSubCategory(`categoryId=${categoryId}`);
        if (response.data) {
            setSubCategory(response.data);
        }
    }

    const onFinish = async (values) => {
        if (values) {
            setCreating(true);
            try {

                const request = await (product ? UpdateProduct(product._id, values)
                    : CreateProduct(values));

                if (request.status === "success") {
                    form.resetFields();
                    toggleModel();
                    refresh();
                    notification.open({
                        message: "Completed succefully!",
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

    return (
        <Modal
            title="Create Product"
            open={isOpen}
            onOk={() => onFinish()}
            okText={product ? "UPDATE" : "CREATE"}
            onCancel={toggleModel}
            okButtonProps={okButtonProps}
            confirmLoading={isCreating}
        >
            <Form
                form={form}
                onFinish={onFinish}
                id='form'
                style={{ padding: '20px' }}
            >
                <Form.Item
                    name="name"
                    label="Name"
                    rules={[{ required: true, },]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name="categoryId"
                    label="Category"
                    rules={[{ required: true, }]}
                >
                    <Select
                        placeholder="Select product category."
                        onChange={handleCategoryChange}
                    >
                        {categories.map(cat => (
                            <Option value={cat._id} key={cat._id}>
                                {cat.name}
                            </Option>
                        ))}
                    </Select>
                </Form.Item>
                <Form.Item
                    name="subCategoryId"
                    label="Sub Category"
                    rules={[{ required: true, }]}
                >
                    <Select
                        placeholder="Select product sub Category."
                        allowClear
                    >
                        {subCategories.map(subcat => (
                            <Option value={subcat._id} key={subcat._id}>
                                {subcat.name}
                            </Option>
                        ))}
                    </Select>
                </Form.Item>
                <Form.Item
                    name="buyingPrice"
                    label="Buying Price"
                    rules={[{ required: true }]}
                >
                    <MoneyInput />
                </Form.Item>
                <Form.Item
                    name="sellingPrice"
                    label="Selling Price"
                    rules={[{ required: true }]}
                >
                    <MoneyInput />
                </Form.Item>
                <Form.Item
                    name="quantity"
                    label="Quantity"
                    rules={[{ required: true, }]}
                >
                    <MoneyInput />
                </Form.Item>
            </Form>
        </Modal>
    );
};

const MoneyInput = ({ value }) => {
    return <InputNumber
        formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
        parser={(value) => value.replace(/\$\s?|(,*)/g, '')}
        value={value}
    />
}
export default AddNewProduct;