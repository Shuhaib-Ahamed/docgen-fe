import React, { useState } from "react";

import { Link } from "react-router-dom";
import { Divider, Layout, Menu } from "antd";
import {
  SettingOutlined,
  DashboardOutlined,
  TeamOutlined,
} from "@ant-design/icons";

import LOGO from "@/assets/images/logo.svg";

import styles from "./navigation.module.less";
import { useLocation } from "react-router-dom/cjs/react-router-dom";

const { Sider } = Layout;

function Navigation() {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();

  const onCollapse = () => {
    setCollapsed(!collapsed);
  };

  const keys = [
    {
      label: "Dashboard",
      path: "/",
      icon: <DashboardOutlined />,
    },
    {
      label: "User Management",
      path: "/users",
      icon: <TeamOutlined />,
    },
    {
      label: " Settings",
      path: "/settings",
      icon: <SettingOutlined />,
    },
  ];

  console.log(location.pathname);

  return (
    <Sider
      collapsible
      collapsed={collapsed}
      onCollapse={onCollapse}
      style={{
        zIndex: 1000,
      }}
    >
      <div className={styles.siderWrapper}>
        <div className={styles.logoContainer}>
          <img className={styles.logo} src={LOGO} alt="DocManager" />
          {!collapsed && <span className={styles.logoHeading}>DocGen</span>}
        </div>
        <Divider
          className={styles.dividerBG}
          orientation="center"
          type="horizontal"
        />
      </div>

      <Menu
        theme="dark"
        selectedKeys={[
          keys
            .findIndex((key) => key.path === location.pathname)
            .toString() || ["0"],
        ]}
        mode="inline"
      >
        {keys.map((item, index) => (
          <Menu.Item key={index} icon={item.icon}>
            <Link to={item.path} />
            {item.label}
          </Menu.Item>
        ))}
      </Menu>
    </Sider>
  );
}
export default Navigation;
