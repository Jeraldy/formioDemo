import React, { useEffect, useState } from 'react';
import { Form } from '@formio/react';
import PageHeader from './PageHeader';
import { Card, message, notification } from 'antd';
import FormsApi from '../api/FormsApi';
import FormDataApi from '../api/FormDataApi';
import { useNavigate, useParams } from 'react-router-dom';

const FormViewer = () => {
  const [formObject, setFormObject] = useState('{}');
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      const fetchForm = async () => {
        const response = await FormsApi.GetOne(id);
        const data = response?.data
        if (data) {
          setFormObject(data.formObject);
        }
      }
      fetchForm();
    }
  }, [id, setFormObject]);

  const handleSave = async (data) => {
    try {
      const form = {
        formDataObject: JSON.stringify(data),
        formId: id
      }
      const request = await FormDataApi.Create(form);
      if (request.status === "success") {
        notification.open({ message: "Saved succefully!", placement: 'top' })
        navigate('/')
      } else {
        message.error(request.message)
      }
    } catch (ex) {
      console.log(ex)
      message.error("Oops! Something went wrong please try gain.")
    }
  };

  return (
    <div>
      <PageHeader />
      <Card style={{ margin: "20px 10%" }}>
        <Form
          form={JSON.parse(formObject)}
          onSubmit={(f) => handleSave(f.data)}
        />
      </Card>
    </div>
  );
};

export default FormViewer;