import React, { useEffect, useState } from 'react';
import { FormBuilder } from '@formio/react';
import PageHeader from './PageHeader';
import { Button, Input, message, notification } from 'antd';
import FormsApi from '../api/FormsApi';
import { useNavigate, useParams } from 'react-router-dom';
// import './style.css';

const CreateNewForm = () => {
  const [initFormObject, setInitFormObject] = useState('{}');
  const [formName, setFormName] = useState();
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      const fetchFormToEdit = async () => {
        const response = await FormsApi.GetOne(id);
        const data = response?.data
        if (data) {
          setInitFormObject(data.formObject);
          handleSchemaChange(data.formObject);
          setFormName(data.formName);
        }
      }
      fetchFormToEdit();
    }
  }, [id, setInitFormObject, setFormName]);

  const handleSchemaChange = (schema) => {
    localStorage.setItem('formObject', schema)
  }

  const handleSave = async () => {
    const formObject = localStorage.getItem('formObject')
    const form = { formObject, formName };
    if (!form.formObject) {
      message.error("Please drag and drop items to create your form!")
      return;
    }

    if (!form.formName) {
      message.error("Please provide form name!")
      return;
    }

    try {
      const request = await (id ? FormsApi.Update(id, form) : FormsApi.Create(form));
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
      <div style={{
        margin: "20px 40px",
        backgroundColor: 'white',
        borderRadius: '8px'
      }}>
        <div style={{
          display: "flex",
          justifyContent: "space-between",
          padding: "10px",
        }}>
          <div></div>
          <div style={{ display: "flex" }}>
            <div style={{ marginRight: "10px" }}>
              <Input
                placeholder='Enter form name'
                value={formName}
                onChange={(e) => setFormName(e.target.value)}
              />
            </div>
            <div><Button type="primary" onClick={handleSave}>
              {id ? 'UPDATE FORM' : 'SAVE FORM'}
            </Button>
            </div>
          </div>
        </div>
        <div style={{ padding: "8px" }}>
          <FormBuilder
            form={JSON.parse(initFormObject)}
            onChange={(schema) => handleSchemaChange(JSON.stringify(schema))}
          />
        </div>
      </div>
    </div>
  );
};

export default CreateNewForm;