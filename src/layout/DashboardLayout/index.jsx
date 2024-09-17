import React from "react";
import HeaderContent from "../HeaderContent";
import styles from "./dashboard.module.less";

import { Layout } from "antd";

const { Content } = Layout;

export default function DashboardLayout({ children }) {
  return (
    <Layout>
      <HeaderContent />
      <Content className={styles.layoutContainer}>{children}</Content>
    </Layout>
  );
}
