import React from 'react';
import { Layout } from 'antd';
import Sidebar from './sidebar/Sidebar';
import Dashboard from './dashboard/Dashboard';

const { Sider, Content } = Layout;

const App = () => {
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider width={200}>
        <Sidebar />
      </Sider>
      <Content>
        <Dashboard />
      </Content>
    </Layout>
  );
};

export default App;
