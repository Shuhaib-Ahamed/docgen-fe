import React from "react";
import styles from "./invoice.module.less";
import Header from "../components/Header/Header";
import Body from "../components/Body/Body";
import Footer from "../components/Footer/Footer";
import { Col, Row } from "antd";
import { convertDate, getFormattedDate } from "@/utils/helpers";

const Invoice = ({ importer, finance, shipping, container }) => {
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
          </Row>{" "}
          <Row
            justify={"space-between"}
            gutter={12}
            className={styles.borderNotTop}
          >
            {finance?.invoiceNo && (
              <Col span={12}>
                <Row>
                  <Col span={12}>
                    <h4 className={styles.label}>INVOICE NO : </h4>
                  </Col>
                  <Col span={12}>
                    <p contentEditable className={styles.text}>
                      {finance?.invoiceNo}
                    </p>
                  </Col>
                </Row>
              </Col>
            )}

            <Col span={12}>
              <Row>
                <Col span={12}>
                  <h4 className={styles.label}>DATE : </h4>
                </Col>
                <Col span={12}>
                  <p className={styles.text}>{getFormattedDate()}</p>
                </Col>
              </Row>
            </Col>
          </Row>{" "}
          {(finance?.piNo || finance?.refNo) && (
            <Row
              justify={"space-between"}
              gutter={12}
              className={styles.borderNotTop}
            >
              {finance?.refNo && (
                <Col span={12}>
                  <Row>
                    <Col span={12}>
                      <h4 className={styles.label}>REFERENCE : </h4>
                    </Col>
                    <Col span={12}>
                      <p contentEditable className={styles.text}>
                        {finance?.refNo}
                      </p>
                    </Col>
                  </Row>
                </Col>
              )}
              {finance?.piNo && (
                <Col span={12}>
                  <Row>
                    <Col span={12}>
                      <h4 className={styles.label}>PI NUMBER : </h4>
                    </Col>
                    <Col span={12}>
                      <p contentEditable className={styles.text}>
                        {finance?.piNo}
                      </p>
                    </Col>
                  </Row>
                </Col>
              )}
            </Row>
          )}
          <div className={styles.marginDivide}></div>
          <Row justify={"space-between"} gutter={12} className={styles.border}>
            <Col span={12}>
              <Row>
                <Col span={12}>
                  <h4
                    className={`${styles.label} ${
                      (shipping?.vesselName || shipping?.voyageNo) ??
                      styles.warningText
                    }`}
                  >
                    VESSEL :{" "}
                  </h4>
                </Col>
                <Col span={12}>
                  <p contentEditable className={styles.text}>
                    {shipping?.vesselName} {shipping?.voyageNo && "/"}{" "}
                    {shipping?.voyageNo}
                  </p>
                </Col>
              </Row>
            </Col>
            <Col span={12}>
              <Row>
                <Col span={12}>
                  <h4 className={styles.label}>DEPARTURE DATE : </h4>
                </Col>
                <Col span={12}>
                  <p className={styles.text}>
                    {convertDate(shipping?.departureDate)}
                  </p>
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
                  <h4
                    className={`${styles.label} ${
                      (shipping?.portLoadName || shipping?.portLoadCountry) ??
                      styles.warningText
                    }`}
                  >
                    PORT OF LOADING :{" "}
                  </h4>
                </Col>
                <Col span={12}>
                  <p contentEditable className={styles.text}>
                    {shipping?.portLoadName}
                    {","}
                    {shipping?.portLoadCountry}
                  </p>
                </Col>
              </Row>
            </Col>
            <Col span={12}>
              <Row>
                <Col span={12}>
                  <h4
                    className={`${styles.label} ${
                      (shipping?.portDischarge ||
                        shipping?.portDischargeCountry) ??
                      styles.warningText
                    }`}
                  >
                    PORT OF DISCHARGE :{" "}
                  </h4>
                </Col>
                <Col span={12}>
                  <p contentEditable className={styles.text}>
                    {" "}
                    {shipping?.portDischarge}
                    {","}
                    {shipping?.portDischargeCountry}
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
                  <h4
                    className={`${styles.label} ${
                      (shipping?.portDischarge ||
                        shipping?.portDischargeCountry) ??
                      styles.warningText
                    }`}
                  >
                    FINAL DESTINATION :{" "}
                  </h4>
                </Col>
                <Col span={12}>
                  <p contentEditable className={styles.text}>
                    {shipping?.portDischarge},{shipping?.portDischargeCountry}
                  </p>
                </Col>
              </Row>
            </Col>
            <Col span={12}>
              <Row>
                <Col span={12}>
                  <h4
                    className={`${styles.label} ${
                      (finance?.fclSize || finance?.fclNo) ?? styles.warningText
                    }`}
                  >
                    CONTAINERS({finance?.fclSize}'FCL) :{" "}
                  </h4>
                </Col>
                <Col span={12}>
                  <p contentEditable className={styles.text}>
                    {finance?.fclNo}
                  </p>
                </Col>
              </Row>
            </Col>
          </Row>{" "}
          <div className={styles.marginDivide}></div>
          <Row justify="space-between" gutter={12} className={styles.border}>
            <Col span={12}>
              <Row>
                <Col span={24}>
                  <h4 contentEditable className={styles.label}>
                    COMPLETE DESCRIPTION OF GOODS
                  </h4>
                </Col>
              </Row>
            </Col>
            <Col span={12}>
              <Row>
                <Col span={8}>
                  <h4
                    className={`${styles.label} ${
                      finance?.quantity ?? styles.warningText
                    }`}
                  >
                    MTS
                  </h4>
                </Col>
                <Col span={8}>
                  <h4
                    className={`${styles.label} ${
                      finance?.usdMT ?? styles.warningText
                    }`}
                  >
                    USD PER MT
                  </h4>
                </Col>
                <Col span={8}>
                  <h4
                    className={`${styles.label} ${
                      finance?.total ?? styles.warningText
                    }`}
                  >
                    AMOUNT ($)
                  </h4>
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
                  <p contentEditable className={styles.text}>
                    {finance?.name}
                  </p>
                </Col>
              </Row>
            </Col>
            <Col span={12}>
              <Row>
                <Col span={8}>
                  <p contentEditable className={styles.text}>
                    {finance?.quantity}
                  </p>
                </Col>
                <Col span={8}>
                  <p contentEditable className={styles.text}>
                    ($) {finance?.usdMT}
                  </p>
                </Col>
                <Col span={8}>
                  <p contentEditable className={styles.text}>
                    ($) {finance?.total}
                  </p>
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
                  <p contentEditable className={styles.text}>
                    {finance?.description}
                  </p>
                </Col>
              </Row>{" "}
            </Col>
          </Row>{" "}
          {(finance?.frieghtCost ||
            finance?.insuaranceCost ||
            finance?.totalCost) && (
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
          )}
          {(finance?.frieghtCost ||
            finance?.insuaranceCost ||
            finance?.totalCost) && (
            <Row
              justify="space-between"
              gutter={12}
              className={styles.borderNotTop}
            >
              <Col span={12}>
                <Row>
                  {finance?.frieghtCost && (
                    <Col span={8}>
                      <p contentEditable className={styles.text}>
                        USD {finance?.frieghtCost}
                      </p>
                    </Col>
                  )}
                  {finance?.insuaranceCost && (
                    <Col span={8}>
                      <p contentEditable className={styles.text}>
                        USD {finance?.insuaranceCost}
                      </p>
                    </Col>
                  )}
                  {finance?.totalCost && (
                    <Col span={8}>
                      <p contentEditable className={styles.text}>
                        USD {finance?.totalCost}
                      </p>
                    </Col>
                  )}
                </Row>
              </Col>
              <Col span={12}></Col>
            </Row>
          )}
          {(finance?.quantity || finance?.usdMT || finance?.total) && (
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
                    <h4 contentEditable className={styles.label}>
                      {finance?.quantity}
                    </h4>
                  </Col>
                  <Col span={8}>
                    <h4 contentEditable className={styles.label}>
                      ($) {finance?.usdMT}
                    </h4>
                  </Col>
                  <Col span={8}>
                    <h4 contentEditable className={styles.label}>
                      ($) {finance?.total}
                    </h4>
                  </Col>
                </Row>
              </Col>
            </Row>
          )}
          <Row
            justify="space-between"
            gutter={12}
            className={styles.borderNotTop}
          >
            <Col span={12}>
              <h4 className={styles.label}>METHOD OF PAYMENT</h4>
            </Col>
            <Col span={12}>
              <p contentEditable className={styles.text}>
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
              <p contentEditable className={styles.text}>
                JM GRAINS PTY. LTD
              </p>
            </Col>
            <Col span={6}>
              <p contentEditable className={styles.text}>
                MIGARI KAUSHALYA
              </p>
            </Col>
            <Col span={6}>
              <p contentEditable className={styles.text}>
                {getFormattedDate()}
              </p>
            </Col>
            <Col span={6}></Col>
          </Row>
        </Body>
      </div>

      <Footer />
    </div>
  );
};

export default Invoice;
