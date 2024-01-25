import React, { useEffect, useRef, useState } from 'react';
import { Form, Input, Popconfirm } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';

export const EditableCell = ({
  title,
  editable,
  children,
  dataIndex,
  record,
  handleSave,
  ...restProps
}) => {
  const [editing, setEditing] = useState(false);
  const inputRef = useRef(null);
  const [form] = Form.useForm();
  useEffect(() => {
    if (editing) {
      inputRef.current.focus();
    }
  }, [editing]);
  const toggleEdit = () => {
    setEditing(!editing);
    form.setFieldsValue({
      [dataIndex]: record[dataIndex],
    });
  };
  const save = async () => {
    try {
      const values = await form.validateFields();
      toggleEdit();
      handleSave({
        ...record,
        ...values,
      });
    } catch (errInfo) {
      console.log('Save failed:', errInfo);
    }
  };
  let childNode = children;
  if (editable) {
    childNode = editing ? (
      <Form form={form}>
        <Form.Item
          style={{
            margin: 0,
          }}
          name={dataIndex}
          rules={[
            {
              required: true,
              message: `${title} is required.`,
            },
          ]}
        >
          <Input ref={inputRef} onPressEnter={save} onBlur={save} type='number'/>
        </Form.Item>
      </Form>
    ) : (
      <div
        className="editable-cell-value-wrap"
        style={{
          paddingRight: 24,
        }}
        onClick={toggleEdit}
      >
        {children}
      </div>
    );
  }
  return <td {...restProps}>{childNode}</td>;
};


export const SHOPPING_CART = (handleDelete, dataSource) => {
  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
    },
    {
      title: 'Price',
      dataIndex: 'sellingPrice',
      render: (r) => parseInt(r).toLocaleString()
    },
    {
      title: 'Total',
      dataIndex: 'total',
      render: (r) => parseInt(r).toLocaleString()
    },
    {
      title: 'Qty.',
      dataIndex: 'qty',
      editable: true
    },
    {
      title: '',
      dataIndex: '',
      render: (_, record) =>
        dataSource.length >= 1 ? (
          <Popconfirm title="Sure to delete?" onConfirm={() => handleDelete(record.key)}>
            <a><DeleteOutlined /></a>
          </Popconfirm>
        ) : null,
    },
  ];
  return columns;
}
