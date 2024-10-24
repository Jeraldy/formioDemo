import React, { useEffect, useState } from 'react';
import { Table, Button, Popconfirm, notification, message } from 'antd';
import { DeleteOutlined, EditOutlined, EyeOutlined, FolderOpenOutlined } from '@ant-design/icons';
import WorkFlowApi from '../api/WorkFlowApi';
import { LIST_WORKFLOW_COLUMNS } from './utils';
import { fetchWorkFlows } from '../api/utils';
import { useNavigate } from 'react-router-dom';
import ViewFormData from './ViewFormData';

const ListCreatedWorkFlows = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [data, setData] = useState([]);
    const [selectedFormId, setSelectedFormId] = useState();
    const [refresh, setRefresh] = useState(false);
    const [showConfirmDelete, setConfirmDelete] = useState(false);
    const [isDeleting, setDeleting] = useState(false);
    const [id, setId] = useState(0);
    const navigate = useNavigate();

    const showModal = () => {
        setIsModalOpen(!isModalOpen);
    };

    const handleDelete = async () => {
        setDeleting(true);
        try {
            const request = await WorkFlowApi.DeleteOne(id);
            if (request.status === "success") {
                setRefresh(!refresh);
                notification.open({
                    message: "Deleted succefully",
                    placement: 'top'
                })
            } else {
                message.error(request.message)
            }
        } catch (ex) {
            console.log(ex)
        }
        setDeleting(false);
    }

    const confirmDelete = (id) => {
        setId(id);
        setConfirmDelete(true);
    }

    useEffect(() => {
        fetchWorkFlows(setData)
    }, [refresh]);

    const deleteComp = (r) => {
        return (
            <Popconfirm
                title="Delete"
                description="Are you sure?"
                open={showConfirmDelete && r._id === id}
                onConfirm={handleDelete}
                okButtonProps={{ loading: isDeleting, }}
                onCancel={() => setConfirmDelete(false)}
            >
                <Button type="link" onClick={() => confirmDelete(r._id)}><DeleteOutlined /></Button>
            </Popconfirm>
        )
    }

    const editComp = (r) => {
        return (
            <Button type="link" onClick={() => navigate(`/workflow-builder/${r._id}`)}><EditOutlined /></Button>
        )
    }

    const viewComp = (r) => {
        return (
            <Button type="link" onClick={() => navigate(`/workflow-render/${r._id}`)}><EyeOutlined /></Button>
        )
    }

    const viewDataComp = (r) => {
        return (
            <Button type="link"
                onClick={() => {
                    setSelectedFormId(r._id)
                    showModal()
                }}>
                <FolderOpenOutlined />
            </Button>
        )
    }

    return (
        <div style={{
            padding: '10px',
            backgroundColor: 'white',
            borderRadius: '8px'
        }}>
            <div style={{
                display: "flex",
                justifyContent: "end",
                padding: "10px",
            }}>
                <Button type="primary" onClick={() => navigate('/workflow-builder')}>
                    Add New Form
                </Button>
            </div>
            <Table
                columns={LIST_WORKFLOW_COLUMNS(
                    deleteComp, editComp, viewComp, viewDataComp
                )}
                size="small"
                dataSource={data}
                bordered
            />
            <ViewFormData
                isOpen={isModalOpen}
                toggleModel={showModal}
                id={selectedFormId}
            />
        </div>
    );
}

export default ListCreatedWorkFlows;