import React from "react";
import styles from "./footer.module.less";
import { Col, Divider, Row } from "antd";

const Footer = ({ divider = true }) => {
  return (
    <div className={styles.footerContainer}>
      {divider && <Divider />}
      <Row gutter={12} justify={"space-between"}>
        <Col span={16}>
          <p
            className={styles.text}
          >{`ABN 47 130 472 767 UNIT 11 – 43 NICHOLSON STREET, ABBOTSFORD, VIC 3067,
      AUSTRALIA`}</p>
        </Col>
        <Col span={4}>
          <p className={styles.text}>TEL: 0061416780374</p>
        </Col>
        <Col span={4}>
          <p className={styles.text}> INFO@JMGRAINS.COM</p>
        </Col>
      </Row>
    </div>
  );
};

export default Footer;
