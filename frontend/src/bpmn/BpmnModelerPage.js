import React, { useEffect, useState } from 'react';
import BpmnModelerComponent from './BpmnModelerComponent';
import PageHeader from '../pages/PageHeader';
import { Button, Input, message, notification } from 'antd';
import WorkFlowApi from '../api/WorkFlowApi';
import { useNavigate, useParams } from 'react-router-dom';

const BpmnModelerPage = () => {
  const [initWorkflowObject, setInitWorkflowObject] = useState('');
  const [workflowName, setWorkflowName] = useState();
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      const fetchWorkflowToEdit = async () => {
        const response = await WorkFlowApi.GetOne(id);
        const data = response?.data
        if (data) {
          const workflowObject = data.workflowObject
          .replace(/&lt;/g, '<')
          .replace(/&gt;/g, '>')
          .replace(/&amp;/g, '&');
          setInitWorkflowObject(workflowObject);
          handleSchemaChange(workflowObject);
          setWorkflowName(data.workflowName);
        }
      }
      fetchWorkflowToEdit();
    }
  }, [id, setInitWorkflowObject, setWorkflowName]);

  const handleSchemaChange = (schema) => {
    localStorage.setItem('workflowObject', schema)
  }

  const handleSave = async () => {
    const workflowObject = localStorage.getItem('workflowObject').toString()
    const form = { workflowObject, workflowName };
    if (!form.workflowObject) {
      message.error("Please drag and drop items to create your workflow!")
      return;
    }

    if (!form.workflowName) {
      message.error("Please provide workflow name!")
      return;
    }

    try {
      const request = await (id ? WorkFlowApi.Update(id, form) : WorkFlowApi.Create(form));
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
                placeholder='Enter workflow name'
                value={workflowName}
                onChange={(e) => setWorkflowName(e.target.value)}
                style={{width:'300px'}}
              />
            </div>
            <div><Button type="primary" onClick={handleSave}>
              {id ? 'UPDATE WORKFLOW' : 'SAVE WORKFLOW'}
            </Button>
            </div>
          </div>
        </div>
        <div style={{ padding: "8px" }}>
          <BpmnModelerComponent
            diagramXML={initWorkflowObject}
            onChange={(schema) => handleSchemaChange(schema)}
          />
        </div>
      </div>
    </div>
  );
};

export default BpmnModelerPage;