import React from "react";
import { useDispatch } from "react-redux";
import { Layout, Avatar, Menu, Dropdown } from "antd";
import { LogoutOutlined, UserOutlined } from "@ant-design/icons";
import { logout } from "@/redux/auth/actions";
import uniqueId from "@/utils/uinqueId";

import styles from "./header.module.less";
const { Header } = Layout;

export default function HeaderContent() {
  const dispatch = useDispatch();

  const menu = (
    <Menu>
      <Menu.Item
        icon={<LogoutOutlined />}
        key={`${uniqueId()}`}
        onClick={() => dispatch(logout())}
      >
        LogOut
      </Menu.Item>
    </Menu>
  );
  return (
    <Header className={styles.headerContainer}>
      <Dropdown overlay={menu} placement="bottomRight" arrow>
        <Avatar icon={<UserOutlined />} />
      </Dropdown>
    </Header>
  );
}
