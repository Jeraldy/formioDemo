import React, { useEffect, useState } from 'react';
import PageHeader from '../pages/PageHeader';
import { Card } from 'antd';
import WorkFlowApi from '../api/WorkFlowApi';
import { useParams } from 'react-router-dom';
import BpmnViewerComponent from './BpmnViewerComponent';

const BpmnViewerPage = () => {
  const [workflowObject, setWorkflowObject] = useState(null);
  const [workflowName, setWorkflowName] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      const fetchWorkFlow = async () => {
        const response = await WorkFlowApi.GetOne(id);
        const data = response?.data
        if (data) {
          const workflowObject = data.workflowObject
            .replace(/&lt;/g, '<')
            .replace(/&gt;/g, '>')
            .replace(/&amp;/g, '&');
          setWorkflowObject(workflowObject);
          setWorkflowName(data.workflowName);
        }
      }
      fetchWorkFlow();
    }
  }, [id, setWorkflowObject]);

  return (
    <div>
      <PageHeader />
      <Card style={{ margin: "20px 10%" }}>
        <div style={{fontWeight: "bold"}}>
          <h5>{workflowName}</h5>
        </div>
        {workflowObject && <BpmnViewerComponent diagramXML={workflowObject} />}
      </Card>
    </div>
  );
};

export default BpmnViewerPage;