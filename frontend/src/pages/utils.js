import { DeleteOutlined } from "@ant-design/icons";
import { Button, Popconfirm } from "antd";


export const LIST_FORMS_COLUMNS = (handleDelete, handleEdit, handleView,viewDataComp) => {
    let columns = [
        {
            title: '#',
            dataIndex: 'index',
            key: 'index',
            width: 10
        },
        {
            title: 'Form Name',
            dataIndex: 'formName',
            key: 'name',
        }
    ];
    if (handleEdit) {
        columns.push({
            key: 'y',
            width: 10,
            render: (r) => handleEdit(r)
        })
    }
    if (handleDelete) {
        columns.push({
            key: 'x',
            width: 10,
            render: (r) => handleDelete(r)
        })
    }

    if (viewDataComp) {
        columns.push({
            title: 'Data',
            key: 'z',
            width: 10,
            render: (r) => viewDataComp(r)
        })
    }

    if (handleView) {
        columns.push({
            title: 'Form',
            key: 'k',
            width: 10,
            render: (r) => handleView(r)
        })
    }
    return columns;
}

export const LIST_WORKFLOW_COLUMNS = (handleDelete, handleEdit, handleView,viewDataComp) => {
    let columns = [
        {
            title: '#',
            dataIndex: 'index',
            key: 'index',
            width: 10
        },
        {
            title: 'WorkFlow Name',
            dataIndex: 'workflowName',
            key: 'name',
        }
    ];
    if (handleEdit) {
        columns.push({
            key: 'y',
            width: 10,
            render: (r) => handleEdit(r)
        })
    }
    if (handleDelete) {
        columns.push({
            key: 'x',
            width: 10,
            render: (r) => handleDelete(r)
        })
    }


    if (handleView) {
        columns.push({
            title: 'Workflow',
            key: 'k',
            width: 10,
            render: (r) => handleView(r)
        })
    }
    return columns;
}

export const deleteComponent = (record, id, showConfirmDelete, 
    isDeleting, confirmDelete, setConfirmDelete, handleDelete) => {
    return (
        <Popconfirm
            title="Delete"
            description="Are you sure?"
            open={showConfirmDelete && record._id === id}
            onConfirm={handleDelete}
            okButtonProps={{ loading: isDeleting, }}
            onCancel={() => setConfirmDelete(false)}
        >
            <Button type="link" onClick={() => confirmDelete(record._id)} style={{
                display: 'inline-block',
                textAlign: 'center',
                padding: 0,
                height: 0,
                width: 0
            }}><DeleteOutlined style={{ fontSize: "12px"}}/></Button>
        </Popconfirm>
    )
}

