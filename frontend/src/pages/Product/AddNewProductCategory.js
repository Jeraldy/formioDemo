import React, { useState } from 'react';
import { Form, Input, Modal, message, notification } from 'antd';
import { CreateProductCategory } from '../../api/Product';

const okButtonProps = {
    htmlType: "submit",
    form: "form"
}

const AddNewProductCategory = ({ isOpen, toggleModel, refresh }) => {

    const [form] = Form.useForm();
    const [isCreating, setCreating] = useState(false);

    const token = null;
    const onFinish = async (values) => {
        if (values) {
            setCreating(true);
            try {
                const request = await CreateProductCategory(token, values);
                if (request.status === "success") {
                    form.resetFields();
                    toggleModel();
                    refresh();
                    notification.open({
                        message: "Created succefully",
                        placement: 'top'
                    })
                }else{
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
            okText="Save"
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