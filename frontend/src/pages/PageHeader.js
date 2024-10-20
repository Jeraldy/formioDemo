import { Button } from 'antd';
import { LeftOutlined, LogoutOutlined } from '@ant-design/icons';
import useSignOut from 'react-auth-kit/hooks/useSignOut';
import { useNavigate } from 'react-router-dom';

const PageHeader = () => {
    const isNotBaseUrl = window.location.pathname !== '/';
    const signOut = useSignOut();
    const navigate = useNavigate();

    const signOutAction = () => {
        localStorage.clear();
        signOut()
        navigate('/login')
    }

    return (<div style={{
        display: "flex",
        justifyContent: "space-between",
        padding: "6px",
        textTransform: 'capitalize',
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
        color: "black",
        fontWeight: 'bold'
    }}>
        {isNotBaseUrl ?
            <Button
                style={{
                    backgroundColor: "transparent",
                    border: "none",
                }}
                onClick={() => navigate(-1)}
                icon={<LeftOutlined />}>
                Back
            </Button> : <div>UBS Admin</div>}
        <Button onClick={signOutAction}
            style={{
                backgroundColor: "transparent",
                border: "none",
            }}>
            <LogoutOutlined />
        </Button>
    </div>)
}

export default PageHeader;