import React, { useEffect, useState } from 'react';
import { Form, Input, Modal, message, notification } from 'antd';
import { CreateProductCategory, UpdateProductCategory } from '../../api/Product';

const okButtonProps = {
    htmlType: "submit",
    form: "form"
}

const AddNewProductCategory = ({ isOpen, toggleModel, refresh, category }) => {

    const [form] = Form.useForm();
    const [isCreating, setCreating] = useState(false);


    useEffect(() => {
        if (category) {
            form.setFieldsValue(category);
        }
    }, [category]);

    const onFinish = async (values) => {
        if (values) {
            setCreating(true);
            try {
                const request = await (
                    category ? UpdateProductCategory(category._id, values)
                        : CreateProductCategory(values));
                if (request.status === "success") {
                    form.resetFields();
                    toggleModel();
                    refresh();
                    notification.open({
                        message: "Completed succefully",
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
            title="Create Product Category"
            open={isOpen}
            onOk={() => onFinish()}
            okText={category ? "UPDATE" : "CREATE"}
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
                    label="Category Name"
                    rules={[{ required: true, },]}
                >
                    <Input />
                </Form.Item>
            </Form>
        </Modal>
    );
};
export default AddNewProductCategory;