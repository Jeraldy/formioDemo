import React from 'react';
import { Tabs } from 'antd';
import ListProduct from './Product/ListProducts';
import ListProductCategory from './Product/ListProductCategory';
import ListProductSubCategory from './Product/ListProductSubCategory';

const TABS = [
  { c: <ListProduct />, l: "SALE" },
  { c: <ListProduct />, l: "ADD" },
  { c: <ListProductCategory />, l: "CATEGORY" },
  { c: <ListProductSubCategory />, l: "SUBCATEGORY" }
]

const Home = () => {

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      paddingLeft: "10px",
    }}>
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