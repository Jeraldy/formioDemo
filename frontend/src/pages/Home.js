import React from 'react';
import { Button, Tabs } from 'antd';
import ListProduct from './Product/ListProducts';
import ListProductCategory from './Product/ListProductCategory';
import ListProductSubCategory from './Product/ListProductSubCategory';
import useSignOut from 'react-auth-kit/hooks/useSignOut';
import { useNavigate } from 'react-router-dom';
import ListProductSell from './Product/ListProductSell';
import ListProductSold from './Product/ListProductSold';

const TABS = [
  { c: <ListProductSell />, l: "SALE" },
  { c: <ListProduct />, l: "ADD" },
  { c: <ListProductCategory />, l: "CATEGORY" },
  { c: <ListProductSubCategory />, l: "SUBCATEGORY" },
  { c: <ListProductSold />, l: "SOLD" },
]

const Home = () => {
  const signOut = useSignOut();
  const navigate = useNavigate();

  const signOutAction = () => {
    localStorage.clear();
    signOut()
    navigate('/login')
  }

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      paddingLeft: "10px",
    }}>
      <Button onClick={signOutAction}>LOGOUT</Button>
      <Tabs
        tabPosition='top'
        items={TABS.map((tab) => {
          return {
            label: tab.l,
            key: tab.l,
            children: tab.c,
          };
        })}
      />
    </div>
  );
};

export default Home;