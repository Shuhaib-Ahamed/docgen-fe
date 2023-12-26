import React, { useState } from "react";

import { Link } from "react-router-dom";
import { Divider, Layout, Menu } from "antd";
import {
  SettingOutlined,
  DashboardOutlined,
  TeamOutlined,
  FileOutlined,
  GlobalOutlined,
  CompassOutlined,
} from "@ant-design/icons";
import { useLocation } from "react-router-dom/cjs/react-router-dom";
import { selectCurrentAdmin } from "@/redux/auth/selectors";
import { useSelector } from "react-redux";
import { ROLE } from "@/modules/UserManagement/constants/userConstants";

import LOGO from "@/assets/images/logo.svg";

import styles from "./navigation.module.less";

const { Sider } = Layout;

function Navigation() {
  const [collapsed, setCollapsed] = useState(false);
  const { role } = useSelector(selectCurrentAdmin);
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
      label: "Orders",
      path: "/orders",
      icon: <FileOutlined />,
    },
    {
      label: "Importers",
      path: "/importers",
      icon: <CompassOutlined />,
    },
    {
      label: "Shippers",
      path: "/shippers",
      icon: <GlobalOutlined />,
    },
  ];

  const keysPrivate = [
    {
      label: "Dashboard",
      path: "/",
      icon: <DashboardOutlined />,
    },
    {
      label: "Orders",
      path: "/orders",
      icon: <FileOutlined />,
    },
    {
      label: "User Management",
      path: "/users",
      icon: <TeamOutlined />,
    },
    {
      label: "Importers",
      path: "/importers",
      icon: <CompassOutlined />,
    },
    {
      label: "Shippers",
      path: "/shippers",
      icon: <GlobalOutlined />,
    },
    {
      label: " Settings",
      path: "/settings",
      icon: <SettingOutlined />,
    },
  ];

  const renderIndex = () => {
    let indexArr = ["0"];
    if (role === ROLE.USER) {
      indexArr = [
        keys.findIndex((key) => key.path === location.pathname).toString(),
      ];
    } else if (role === ROLE.ADMIN) {
      indexArr = [
        keysPrivate
          .findIndex((key) => key.path === location.pathname)
          .toString(),
      ];
    }

    return indexArr;
  };

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

      <Menu theme="dark" selectedKeys={renderIndex()} mode="inline">
        {role === ROLE.USER &&
          keys.map((item, index) => (
            <Menu.Item key={index} icon={item.icon}>
              <Link to={item.path} />
              {item.label}
            </Menu.Item>
          ))}
        {role === ROLE.ADMIN &&
          keysPrivate.map((item, index) => (
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
