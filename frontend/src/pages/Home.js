import React from 'react';
import { Tabs } from 'antd';
import ListCreatedForms from './ListCreatedForms';
import PageHeader from './PageHeader';


const pages = [
  { c: <ListCreatedForms />, l: "CREATED FORMS" },
]

const Home = () => {
  return (
    <div>
      <PageHeader />
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