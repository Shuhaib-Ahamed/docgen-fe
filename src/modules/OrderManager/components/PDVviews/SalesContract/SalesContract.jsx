import React from "react";
import { Col, Row } from "antd";
import Header from "../components/Header/Header";
import Body from "../components/Body/Body";
import Footer from "../components/Footer/Footer";

import styles from "./sales.module.less";
import { convertDate, getFormattedDate } from "@/utils/helpers";

const SalesContract = ({ importer, finance, shipping, container }) => {
  return (
    <div className={styles.pdfContainer}>
      <Header />
      <div className={styles.wrapper}>
        <Body>
          <Row justify={"center"}>
            <h1 className={styles.header}>CONTRACT OF SALE</h1>
          </Row>
          <Row justify={"space-between"} gutter={12} className={styles.border}>
            <Col span={12}>
              <Row>
                <Col span={24}>
                  <h4 className={styles.label}>SELLER</h4>
                  <p className={styles.text}>J.M. GRAINS PTY LTD UNIT</p>
                  <p className={styles.text}>11 - 43 NICHOLSON STREET,</p>
                  <p className={styles.text}>ABBOTSFORD,</p>
                  <p className={styles.text}>VIC 3067, AUSTRALIA.</p>
                </Col>
              </Row>
            </Col>
            <Col span={12}>
              <Row>
                <Col span={24}>
                  <h4 className={styles.label}>BUYER</h4>
                  <p contentEditable className={styles.text}>
                    {importer?.companyName}
                  </p>
                  <p contentEditable className={styles.text}>
                    {importer?.addressNo}
                  </p>
                  <p contentEditable className={styles.text}>
                    {importer?.address}, {importer?.country}
                  </p>
                </Col>
              </Row>
            </Col>
          </Row>
          <Row
            justify={"space-between"}
            gutter={12}
            className={styles.borderNotTop}
          >
            <Col span={12}>
              <Row>
                <Col span={12}>
                  <h4 className={styles.label}>CONTRACT NO : </h4>
                </Col>
                <Col span={12}>
                  <p contentEditable className={styles.text}>
                    {shipping?.salesContractNumber}
                  </p>
                </Col>
              </Row>
            </Col>
            <Col span={12}>
              <Row>
                <Col span={12}>
                  <h4 className={styles.label}>DATE</h4>
                </Col>
                <Col span={12}>
                  <p className={styles.text}>{getFormattedDate()}</p>
                </Col>
              </Row>
            </Col>
          </Row>{" "}
          <div className={styles.marginDivide}></div>
          <Row justify={"space-between"} gutter={12} className={styles.border}>
            <Col span={12}>
              <h4 className={styles.label}>COMMODITY</h4>
            </Col>
            <Col span={12}>
              <p contentEditable className={styles.text}>
                {finance?.name}
              </p>
            </Col>
          </Row>{" "}
          <Row
            justify={"space-between"}
            gutter={12}
            className={styles.borderNotTop}
          >
            <Col span={12}>
              <h4 className={styles.label}>QUANTITY</h4>
            </Col>
            <Col span={12}>
              <p contentEditable className={styles.text}>
                {container?.fclNo} x {container?.fclSize}ft FCL (Approx.{" "}
                {container?.fclSize} MT each FCL)
              </p>
            </Col>
          </Row>{" "}
          <Row
            justify={"space-between"}
            gutter={12}
            className={styles.borderNotTop}
          >
            <Col span={12}>
              <h4 className={styles.label}>PACKING</h4>
            </Col>
            <Col span={12}>
              <p contentEditable className={styles.text}>
                In Bulk in Containers
              </p>
            </Col>
          </Row>{" "}
          <Row
            justify={"space-between"}
            gutter={12}
            className={styles.borderNotTop}
          >
            <Col span={12}>
              <h4 className={styles.label}>SHIPMENT</h4>
            </Col>
            <Col span={12}>
              <p className={styles.text}>
                {convertDate(shipping?.departureDate)}
              </p>
            </Col>
          </Row>{" "}
          <Row
            justify={"space-between"}
            gutter={12}
            className={styles.borderNotTop}
          >
            <Col span={12}>
              <h4 className={styles.label}>PRICE</h4>
            </Col>
            <Col span={12}>
              <p contentEditable className={styles.text}>
                USD {finance?.usdMT}- PMT CIF Colombo, Sri Lanka.
              </p>
            </Col>
          </Row>{" "}
          <Row
            justify={"space-between"}
            gutter={12}
            className={styles.borderNotTop}
          >
            <Col span={12}>
              <h4 className={styles.label}>LOADING PORT</h4>
            </Col>
            <Col span={12}>
              <p contentEditable className={styles.text}>
                {shipping?.portLoadName}, {shipping?.portLoadCountry}
              </p>
            </Col>
          </Row>{" "}
          <Row
            justify={"space-between"}
            gutter={12}
            className={styles.borderNotTop}
          >
            <Col span={12}>
              <h4 className={styles.label}>DISCHARGE PORT</h4>
            </Col>
            <Col span={12}>
              <p contentEditable className={styles.text}>
                {" "}
                {shipping?.portDischarge}, {shipping?.portDischargeCountry}
              </p>
            </Col>
          </Row>{" "}
          <Row
            justify={"space-between"}
            gutter={12}
            className={styles.borderNotTop}
          >
            <Col span={12}>
              <h4 className={styles.label}>PAYMENT TERM</h4>
            </Col>
            <Col span={12}>
              <p contentEditable className={styles.text}>
                Cash Against Documents Through the Buyers Bank.
              </p>
            </Col>
          </Row>{" "}
          <div className={styles.marginDivide}></div>{" "}
          <Row justify="center">
            <h4 contentEditable className={styles.label}>
              WE THANK YOU FOR YOUR BUSINESS!!
            </h4>
          </Row>
          <Row justify="space-evenly" className={styles.marginTopContainer}>
            <Col>
              <Row justify="center">
                <p className={styles.text}>
                  ................................................................................
                </p>
              </Row>{" "}
              <Row justify="center">
                <h4 contentEditable className={styles.label}>
                  J.M. GRAINS PTY LTD
                </h4>
              </Row>
            </Col>
            <Col>
              <Row justify="center">
                <p className={styles.text}>
                  ................................................................................
                </p>
              </Row>
              <Row justify="center">
                <h4 contentEditable className={styles.label}>
                  GLOBAL TRADING & COMPANY (PVT) LTD.
                </h4>
              </Row>
            </Col>
          </Row>
        </Body>
      </div>
      <Footer />
    </div>
  );
};

export default SalesContract;
