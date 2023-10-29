import React from "react";
import styles from "./sales.module.less";
import Header from "../components/Header/Header";
import Body from "../components/Body/Body";
import Footer from "../components/Footer/Footer";
import { Divider } from "antd";

const SalesContract = () => {
  return (
    <div className={styles.pdfContainer}>
      <Header />
      <div className={styles.wrapper}>
        <Divider />
        <Body>Hello Body</Body>
      </div>
    </div>
  );
};

export default SalesContract;
