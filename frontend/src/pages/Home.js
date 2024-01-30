import React from 'react';
import { Button, Tabs } from 'antd';
import ListProduct from './Product/List/ListProducts';
import ListProductCategory from './Product/List/ListProductCategory';
import ListProductSubCategory from './Product/List/ListProductSubCategory';
import useSignOut from 'react-auth-kit/hooks/useSignOut';
import { useNavigate } from 'react-router-dom';
import ListProductSell from './Product/List/ListProductSell';
import ListProductSold from './Product/List/ListProductSold';
import { LogoutOutlined } from '@ant-design/icons';


const _RESTRICTED = [
  { c: <ListProduct />, l: "PRODUCTS" },
  { c: <ListProductCategory />, l: "CATEGORY" },
  { c: <ListProductSubCategory />, l: "SUBCATEGORY" },
]

const TABS = [
  { c: <ListProductSell />, l: "SALE" },
  { c: <ListProductSold />, l: "REPORT" },
]



const Home = () => {
  const signOut = useSignOut();
  const navigate = useNavigate();

  const signOutAction = () => {
    localStorage.clear();
    signOut()
    navigate('/login')
  }

  const userRole = localStorage.getItem("role");
  let pages = TABS;
  if(userRole === "admin"){
    pages = [...TABS, ..._RESTRICTED]
  }
  return (
    <div >
      <div style={{
        backgroundColor: "green",
        display: "flex",
        justifyContent: "space-between",
        padding: "6px",
        color: "white",
        textTransform: 'capitalize'
      }}>
        <div>{localStorage.getItem("role")}</div>
        <Button onClick={signOutAction} style={{
          backgroundColor: "transparent",
          border: "none",
          color: "white",
        }}>
          <LogoutOutlined />
        </Button>
      </div>
      <div style={{ padding: "0 10px" }}>
        <Tabs
          tabPosition='top'
          items={pages.map((tab) => {
            return {
              label: tab.l,
              key: tab.l,
              children: tab.c,
            };
          })}
        />
      </div>
    </div>
  );
};

export default Home;