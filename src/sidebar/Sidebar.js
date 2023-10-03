import React from 'react';
import { Menu } from 'antd';
import './Sidebar.css'; 
import LogoSVG from './Frame.svg';
import { AppstoreOutlined, SettingOutlined, PoweroffOutlined} from '@ant-design/icons'; 

const Sidebar = () => {
  return (
    <div className="sidebar-bg">
      <Menu mode="vertical" theme="dark" className="custom-menu">
        <img src={LogoSVG} alt="Logo" className="logo-svg" />
        <Menu.Item key="dashboard">
          <AppstoreOutlined /> Dashboard
        </Menu.Item>
        <Menu.Item key="ajustes">
          <SettingOutlined /> Ajustes
        </Menu.Item>
        <Menu.Item key="logout" className="logout-item">
          <PoweroffOutlined /> Desconectar
        </Menu.Item>
      </Menu>
    </div>
  );
};

export default Sidebar;
