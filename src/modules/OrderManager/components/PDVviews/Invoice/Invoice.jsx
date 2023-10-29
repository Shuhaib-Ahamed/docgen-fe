import React from "react";
import styles from "./invoice.module.less";
import Header from "../components/Header/Header";
import Body from "../components/Body/Body";
import Footer from "../components/Footer/Footer";
import { Col, Divider, Row } from "antd";

const Invoice = () => {
  return (
    <div className={styles.pdfContainer}>
      <Header />
      <div className={styles.wrapper}>
        <Body>
          <Row justify={"center"}>
            <h1 className={styles.header}>COMMERCIAL INVOICE</h1>
          </Row>
          <Row justify={"space-between"} gutter={12} className={styles.border}>
            <Col span={12}>
              <Row>
                <Col span={24}>
                  <h4 className={styles.label}>Exporter :</h4>
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
                  <h4 className={styles.label}>Applicant : </h4>
                  <p className={styles.text}>SENORA (PVT)</p>
                  <p className={styles.text}>LTD NO.121, 5TH CROSS STREET,</p>
                  <p className={styles.text}>COLOMBO 11, SRI LANKA.</p>
                </Col>
              </Row>
            </Col>
          </Row>{" "}
          <Row
            justify={"space-between"}
            gutter={12}
            className={styles.borderNotTop}
          >
            <Col span={12}>
              <Row>
                <Col span={12}>
                  <h4 className={styles.label}>INVOICE NO : </h4>
                </Col>
                <Col span={12}>
                  <p className={styles.text}>4207-01</p>
                </Col>
              </Row>
            </Col>
            <Col span={12}>
              <Row>
                <Col span={12}>
                  <h4 className={styles.label}>DATE : </h4>
                </Col>
                <Col span={12}>
                  <p className={styles.text}>15/08/2023</p>
                </Col>
              </Row>
            </Col>
          </Row>{" "}
          <Row
            justify={"space-between"}
            gutter={12}
            className={styles.borderNotTop}
          >
            <Col span={12}>
              <Row>
                <Col span={12}>
                  <h4 className={styles.label}>REFERENCE : </h4>
                </Col>
                <Col span={12}>
                  <p className={styles.text}>5241231</p>
                </Col>
              </Row>
            </Col>
            <Col span={12}>
              <Row>
                <Col span={12}>
                  <h4 className={styles.label}>PI NUMBER : </h4>
                </Col>
                <Col span={12}>
                  <p className={styles.text}>PI4207-01</p>
                </Col>
              </Row>
            </Col>
          </Row>
          <div className={styles.marginDivide}></div>
          <Row justify={"space-between"} gutter={12} className={styles.border}>
            <Col span={12}>
              <Row>
                <Col span={12}>
                  <h4 className={styles.label}>VESSEL : </h4>
                </Col>
                <Col span={12}>
                  <p className={styles.text}>APL NEW YORK / MA332R</p>
                </Col>
              </Row>
            </Col>
            <Col span={12}>
              <Row>
                <Col span={12}>
                  <h4 className={styles.label}>DEPARTURE DATE : </h4>
                </Col>
                <Col span={12}>
                  <p className={styles.text}>15/08/2023</p>
                </Col>
              </Row>
            </Col>
          </Row>
          <Row
            justify="space-between"
            gutter={12}
            className={styles.borderNotTop}
          >
            <Col span={12}>
              <Row>
                <Col span={12}>
                  <h4 className={styles.label}>PORT OF LOADING : </h4>
                </Col>
                <Col span={12}>
                  <p className={styles.text}>MELBOURNE, AUSTRALIA</p>
                </Col>
              </Row>
            </Col>
            <Col span={12}>
              <Row>
                <Col span={12}>
                  <h4 className={styles.label}>PORT OF DISCHARGE : </h4>
                </Col>
                <Col span={12}>
                  <p className={styles.text}>COLOMBO, SRI LANKA</p>
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
                  <h4 className={styles.label}>FINAL DESTINATION : </h4>
                </Col>
                <Col span={12}>
                  <p className={styles.text}>COLOMBO, SRI LANKA</p>
                </Col>
              </Row>
            </Col>
            <Col span={12}>
              <Row>
                <Col span={12}>
                  <h4 className={styles.label}>CONTAINERS(20'FCL) : </h4>
                </Col>
                <Col span={12}>
                  <p className={styles.text}>5</p>
                </Col>
              </Row>
            </Col>
          </Row>{" "}
          <div className={styles.marginDivide}></div>
          <Row justify="space-between" gutter={12} className={styles.border}>
            <Col span={12}>
              <Row>
                <Col span={24}>
                  <h4 className={styles.label}>
                    COMPLETE DESCRIPTION OF GOODS
                  </h4>
                </Col>
              </Row>
            </Col>
            <Col span={12}>
              <Row>
                <Col span={8}>
                  <h4 className={styles.label}>MTS</h4>
                </Col>
                <Col span={8}>
                  <h4 className={styles.label}>USD PER MT</h4>
                </Col>
                <Col span={8}>
                  <h4 className={styles.label}>AMOUNT ($)</h4>
                </Col>
              </Row>
            </Col>
          </Row>{" "}
          <Row
            justify="space-between"
            gutter={12}
            className={styles.borderNotTop}
          >
            <Col span={12}>
              <Row>
                <Col span={24}>
                  <p className={styles.text}>RED WHOLE LENTILS</p>
                </Col>
              </Row>
            </Col>
            <Col span={12}>
              <Row>
                <Col span={8}>
                  <p className={styles.text}>124.32</p>
                </Col>
                <Col span={8}>
                  <p className={styles.text}>715.24</p>
                </Col>
                <Col span={8}>
                  <p className={styles.text}>8 8,918.80</p>
                </Col>
              </Row>
            </Col>
          </Row>{" "}
          <Row
            justify="space-between"
            gutter={12}
            className={styles.borderNotTop}
          >
            <Col span={12}>
              <Row>
                <Col span={24}>
                  <p className={styles.text}>
                    QUANTITY:124.32 M.TONS AUSTRALIAN RED WHOLE LENTILS JUMBO
                    VARIETY I-JSD ?15.24 PER M. TON CIF COLOMBO, SRI LANKA. HS
                    CODE 071340.11
                  </p>
                </Col>
              </Row>{" "}
            </Col>
          </Row>{" "}
          <Row
            justify="space-between"
            gutter={12}
            className={styles.borderNotTop}
          >
            <Col span={12}>
              <Row>
                <Col span={8}>
                  <h4 className={styles.label}>FREIGHT</h4>
                </Col>
                <Col span={8}>
                  <h4 className={styles.label}>INSURANCE</h4>
                </Col>
                <Col span={8}>
                  <h4 className={styles.label}>COST</h4>
                </Col>
              </Row>
            </Col>
            <Col span={12}></Col>
          </Row>
          <Row
            justify="space-between"
            gutter={12}
            className={styles.borderNotTop}
          >
            <Col span={12}>
              <Row>
                <Col span={8}>
                  <p className={styles.text}>USD 5,000.00</p>
                </Col>
                <Col span={8}>
                  <p className={styles.text}>USD 970.93</p>
                </Col>
                <Col span={8}>
                  <p className={styles.text}>USD 82,947.87</p>
                </Col>
              </Row>
            </Col>
            <Col span={12}></Col>
          </Row>
          <Row
            justify="space-between"
            gutter={12}
            className={styles.borderNotTop}
          >
            <Col span={12}>
              <h4 className={styles.label}>TOTAL GOODS</h4>
            </Col>
            <Col span={12}>
              <Row>
                <Col span={8}>
                  <h4 className={styles.label}> 124.32 </h4>
                </Col>
                <Col span={8}>
                  <h4 className={styles.label}> 124.32 </h4>
                </Col>
                <Col span={8}>
                  <h4 className={styles.label}>88,918.80</h4>
                </Col>
              </Row>
            </Col>
          </Row>{" "}
          <Row
            justify="space-between"
            gutter={12}
            className={styles.borderNotTop}
          >
            <Col span={12}>
              <h4 className={styles.label}>METHOD OF PAYMENT</h4>
            </Col>
            <Col span={12}>
              <p className={styles.text}>
                CASH AGAINST DOCUMENTS THROUGH THE BUYERS BANK
              </p>
            </Col>
          </Row>{" "}
          <div className={styles.marginDivide}></div>
          <Row justify={"space-between"} gutter={12} className={styles.border}>
            <Col span={6}>
              <h4 className={styles.label}>COMPANY</h4>
            </Col>
            <Col span={6}>
              <h4 className={styles.text}>ISSUED BY</h4>
            </Col>
            <Col span={6}>
              <h4 className={styles.label}>DATE</h4>
            </Col>
            <Col span={6}>
              <h4 className={styles.label}>SIGNATURE</h4>
            </Col>
          </Row>
          <Row
            justify={"space-between"}
            gutter={12}
            className={styles.borderNotTop}
          >
            <Col span={6}>
              <p className={styles.text}>JM GRAINS PTY. LTD</p>
            </Col>
            <Col span={6}>
              <p className={styles.text}>MIGARI KAUSHALYA</p>
            </Col>
            <Col span={6}>
              <p className={styles.text}>15/08/2023</p>
            </Col>
            <Col span={6}>
              <p className={styles.text}></p>
            </Col>
          </Row>
        </Body>
        <Divider />
        <Footer />
      </div>
    </div>
  );
};

export default Invoice;
