import React from "react";
import styles from "./footer.module.less";
import { Col, Divider, Row } from "antd";

const Footer = ({ divider = true }) => {
  return (
    <div className={styles.footerContainer}>
      {divider && <Divider />}
      <Row gutter={2} justify={"space-between"}>
        <Col span={14}>
          <p
            className={styles.text}
          >{`ABN 47 130 472 767 UNIT 11 – 43 NICHOLSON STREET, ABBOTSFORD,
      AUSTRALIA`}</p>
        </Col>
        <Col span={5}>
          <p className={styles.text}>TEL: 0061416780374</p>
        </Col>
        <Col span={5}>
          <p className={styles.text}> INFO@JMGRAINS.COM</p>
        </Col>
      </Row>
    </div>
  );
};

export default Footer;
