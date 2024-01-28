import React, { useEffect, useState } from 'react';
import { Form, Input, Modal, Select, message, notification } from 'antd';
import { CreateProductSubCategory, GetProductCategory, UpdateProductSubCategory } 
from '../../../api/Product';

const { Option } = Select;

const okButtonProps = {
    htmlType: "submit",
    form: "form"
}

const AddNewProductSubCategory = ({ isOpen, toggleModel, refresh, subCategory }) => {

    const [form] = Form.useForm();
    const [isCreating, setCreating] = useState(false);
    const [data, setData] = useState([]);

    useEffect(() => {
        if (subCategory) {
            form.setFieldsValue({
                name: subCategory.name,
                categoryId: subCategory.categoryId._id
            });
        }
    }, [subCategory, form]);

    useEffect(() => {
        const fetchCategory = async () => {
            const response = await GetProductCategory();
            if (response.data) {
                setData(response.data)
            }
        }
        fetchCategory()
    }, []);

    const onFinish = async (values) => {
        if (values) {
            setCreating(true);
            try {
                const request = await (
                    subCategory ? UpdateProductSubCategory(subCategory._id, values)
                        : CreateProductSubCategory(values)
                );

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
            title="Create Product Sub Category"
            open={isOpen}
            onOk={() => onFinish()}
            okText={subCategory ? "UPDATE" : "CREATE"}
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
                    label="Sub Category Name"
                    rules={[{ required: true, }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name="categoryId"
                    label="Category"
                    rules={[{ required: true, }]}
                >
                    <Select placeholder="Select product category.">
                        {data.map(category => (
                            <Option value={category._id} key={category._id}>
                                {category.name}
                            </Option>
                        ))}
                    </Select>
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default AddNewProductSubCategory;