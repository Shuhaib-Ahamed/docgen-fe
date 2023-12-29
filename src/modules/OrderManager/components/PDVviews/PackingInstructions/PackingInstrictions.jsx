import React from "react";

import Header from "../components/Header/Header";
import Body from "../components/Body/Body";
import Footer from "../components/Footer/Footer";
import { Col, Row } from "antd";

import styles from "./packing.module.less";
import { convertDate, getFormattedDate } from "@/utils/helpers";

const PackingInstrictions = ({ importer, finance, shipping, container }) => {
  return (
    <div className={styles.pdfContainer}>
      <Header />
      <div className={styles.wrapper}>
        <Body>
          <Row justify={"center"}>
            <h1 className={styles.header}>PACKING INSTRUCTIONS</h1>
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
                  <h4 className={styles.label}>PACKER : </h4>
                  <p contentEditable className={styles.text}>
                    PB SEEDS
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
            <Col span={12}>
              {shipping?.salesContractNumber && (
                <Row>
                  <Col span={14}>
                    <h4 className={styles.label}>Sales Contract number :</h4>
                  </Col>
                  <Col span={10}>
                    <p contentEditable className={styles.text}>
                      {shipping?.salesContractNumber}
                    </p>
                  </Col>
                </Row>
              )}
            </Col>
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
          </Row>
          {(shipping?.bookingRef || finance?.refNo) && (
            <Row
              justify={"space-between"}
              gutter={12}
              className={styles.borderNotTop}
            >
              <Col span={12}>
                {finance?.refNo && (
                  <Row>
                    <Col span={14}>
                      <h4 className={styles.label}>REFERENCE : </h4>
                    </Col>
                    <Col span={10}>
                      <p contentEditable className={styles.text}>
                        {finance?.refNo}
                      </p>
                    </Col>
                  </Row>
                )}
              </Col>
              <Col span={12}>
                {shipping?.bookingRef && (
                  <Row>
                    <Col span={12}>
                      <h4 className={styles.label}>ORDER NUMBER : </h4>
                    </Col>
                    <Col span={12}>
                      <p contentEditable className={styles.text}>
                        {shipping?.bookingRef}
                      </p>
                    </Col>
                  </Row>
                )}
              </Col>
            </Row>
          )}{" "}
          {(finance?.rfp || finance?.edn) && (
            <Row
              justify={"space-between"}
              gutter={12}
              className={styles.borderNotTop}
            >
              {finance?.rfp && (
                <Col span={12}>
                  <Row>
                    <Col span={14}>
                      <h4 className={styles.label}>RFP : </h4>
                    </Col>
                    <Col span={10}>
                      <p contentEditable className={styles.text}>
                        {finance?.rfp}
                      </p>
                    </Col>
                  </Row>
                </Col>
              )}
              {finance?.edn && (
                <Col span={12}>
                  <Row>
                    <Col span={12}>
                      <h4 className={styles.label}>EDN: </h4>
                    </Col>
                    <Col span={12}>
                      <p contentEditable className={styles.text}>
                        {finance?.edn}
                      </p>
                    </Col>
                  </Row>
                </Col>
              )}
            </Row>
          )}
          <div className={styles.marginDivide}></div>
          <Row justify={"center"} gutter={12} className={styles.border}>
            <h4 className={styles.label}>Shipping Details</h4>
          </Row>
          {(shipping?.shippingContactNo ||
            shipping?.bookingRef ||
            shipping?.shippingContactName) && (
            <Row gutter={12} className={styles.borderNotTop}>
              {shipping?.bookingRef && (
                <>
                  <Col span={4}>
                    <h4 className={styles.label}>BOOKING REF : </h4>
                  </Col>
                  <Col span={4}>
                    <p contentEditable className={styles.text}>
                      {shipping?.bookingRef}
                    </p>
                  </Col>
                </>
              )}

              {shipping?.shippingContactName && (
                <>
                  <Col>
                    <h4 className={styles.label}>CONTACT NAME : </h4>
                  </Col>
                  <Col span={4}>
                    <p contentEditable className={styles.text}>
                      {shipping?.shippingContactName}
                    </p>
                  </Col>
                </>
              )}
              {shipping?.shippingContactNo && (
                <>
                  <Col>
                    <h4 className={styles.label}>PHONE : </h4>
                  </Col>
                  <Col>
                    <p contentEditable className={styles.text}>
                      {shipping?.shippingContactNo}
                    </p>
                  </Col>
                </>
              )}
            </Row>
          )}
          <Row
            justify={"space-between"}
            gutter={12}
            className={styles.borderNotTop}
          >
            <Col span={12}>
              <Row>
                <Col span={14}>
                  <h4
                    className={`${styles.label} ${
                      shipping?.shippingCompany ?? styles.warningText
                    }`}
                  >
                    CARRIER :
                  </h4>
                </Col>
                <Col span={10}>
                  <p contentEditable className={styles.text}>
                    {shipping?.shippingCompany}
                  </p>
                </Col>
              </Row>
            </Col>
            <Col span={12}>
              <Row>
                <Col span={12}>
                  <h4
                    className={`${styles.label} ${
                      container?.releaseDate ?? styles.warningText
                    }`}
                  >
                    CUT OFF :{" "}
                  </h4>
                </Col>
                <Col span={12}>
                  <p contentEditable className={styles.text}>
                    {convertDate(container?.releaseDate)}
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
            {shipping?.departureDate && (
              <Col span={12}>
                <Row>
                  <Col span={12}>
                    <h4 className={styles.label}>DEPARTURE DATE : </h4>
                  </Col>
                  <Col span={12}>
                    <p contentEditable className={styles.text}>
                      {convertDate(shipping?.departureDate)}
                    </p>
                  </Col>
                </Row>
              </Col>
            )}
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
                    {shipping?.portLoadName}, {shipping?.portLoadCountry}
                  </p>
                </Col>
              </Row>
            </Col>
            <Col span={12}>
              <Row>
                <Col span={12}>
                  <h4 className={styles.label}>PORT OF DISCHARGE : </h4>
                </Col>
                <Col span={12}>
                  <p contentEditable className={styles.text}>
                    {shipping?.portDischarge}, {shipping?.portDischargeCountry}
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
                    {shipping?.portDischarge}, {shipping?.portDischargeCountry}
                  </p>
                </Col>
              </Row>
            </Col>
            {(finance?.fclSize || finance?.fclNo) && (
              <>
                <Col span={12}>
                  <Row>
                    <Col span={12}>
                      <h4 className={styles.label}>
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
              </>
            )}
          </Row>{" "}
          <div className={styles.marginDivide}></div>
          <Row justify={"center"} gutter={12} className={styles.border}>
            <h4 className={styles.label}>CONTAINERS</h4>
          </Row>{" "}
          {(container?.releaseDate || container?.releaseNumber) && (
            <Row
              justify={"space-between"}
              gutter={12}
              className={styles.borderNotTop}
            >
              {container?.releaseDate && (
                <Col span={12}>
                  <Row>
                    <Col span={14}>
                      <h4 className={styles.label}>EMPTY RELEASE DATE</h4>
                    </Col>
                    <Col span={10}>
                      <p className={styles.text}>
                        {" "}
                        {convertDate(container?.releaseDate)}
                      </p>
                    </Col>
                  </Row>
                </Col>
              )}
              {container?.releaseNumber && (
                <Col span={12}>
                  <Row>
                    <Col span={12}>
                      <h4 className={styles.label}>RELEASE NUMBER</h4>
                    </Col>
                    <Col span={12}>
                      <p contentEditable className={styles.text}>
                        {container?.releaseNumber}
                      </p>
                    </Col>
                  </Row>
                </Col>
              )}
            </Row>
          )}
          <Row
            justify={"space-between"}
            gutter={12}
            className={styles.borderNotTop}
          >
            <Col span={12}>
              <Row>
                <Col span={14}>
                  <h4
                    className={`${styles.label} ${
                      container?.releaseFrom ?? styles.warningText
                    }`}
                  >
                    FROM
                  </h4>
                </Col>
                <Col span={10}>
                  <p contentEditable className={styles.text}>
                    {container?.releaseFrom}
                  </p>
                </Col>
              </Row>
            </Col>
            <Col span={12}>
              <Row>
                <Col span={12}>
                  <h4
                    className={`${styles.label} ${
                      container?.releaseTo ?? styles.warningText
                    }`}
                  >
                    RETURN TO
                  </h4>
                </Col>
                <Col span={12}>
                  <p contentEditable className={styles.text}>
                    {container?.releaseTo}
                  </p>
                </Col>
              </Row>
            </Col>
          </Row>
          <div className={styles.marginDivide}></div>
          <Row justify={"space-between"} gutter={12} className={styles.border}>
            <Col span={6}>
              <h4
                className={`${styles.label} ${
                  finance?.specification ?? styles.warningText
                }`}
              >
                Specification/Grade
              </h4>
            </Col>
            <Col span={6}>
              <h4
                className={`${styles.label} ${
                  finance?.description ?? styles.warningText
                }`}
              >
                Description of Goods
              </h4>
            </Col>{" "}
            <Col span={12}>
              <h4
                className={`${styles.label} ${
                  finance?.specification ?? styles.warningText
                }`}
              >
                Surveyor
              </h4>
            </Col>
          </Row>{" "}
          <Row
            justify={"space-between"}
            gutter={12}
            className={styles.borderNotTop}
          >
            <Col span={6}>
              <Row>
                <Col span={24}>
                  <p contentEditable className={styles.text}>
                    {finance?.specification}
                  </p>
                </Col>
              </Row>
            </Col>
            <Col span={6}>
              <Row>
                <Col span={24}>
                  <p contentEditable className={styles.text}>
                    {finance?.description}
                  </p>
                  <p
                    className={`${styles.label} ${
                      finance?.quantity ?? styles.warningText
                    }`}
                  >
                    Total : {finance?.quantity} MT
                  </p>
                </Col>
              </Row>
            </Col>{" "}
            <Col span={12}>
              <Row>
                <Col span={24}>
                  <p contentEditable className={styles.label}>
                    SEND 1KG SAMPLE TO :
                  </p>
                  <p contentEditable className={styles.text}>
                    AMSPEC
                  </p>
                  <p contentEditable className={styles.text}>
                    9 BROCK STREET,
                  </p>
                  <p contentEditable className={styles.text}>
                    PORT ADELIADE SOUTH, AUSTRALIA 5015
                  </p>
                  <Row>
                    <Col span={8}>
                      <p className={styles.label}>CONTACT NAME :</p>
                    </Col>
                    <Col span={16}>
                      <p contentEditable className={styles.text}>
                        ALINA WHISTON /LEE SHILVOCK
                      </p>
                    </Col>
                  </Row>
                  <Row>
                    <Col span={4}>
                      <p contentEditable className={styles.label}>
                        EMAIL
                      </p>
                    </Col>
                    <Col>
                      <p contentEditable className={styles.text}>
                        ALINA.WHISTON@AMSPECGROUP.COM
                      </p>{" "}
                      <p contentEditable className={styles.text}>
                        LEE.SHILVOCK@AMSPECGROUP.COM
                      </p>
                    </Col>
                  </Row>
                  <Row>
                    <Col span={24}>
                      <p contentEditable className={styles.label}>
                        PLEASE LABEL SAMPLE WITH CONTRACT NUMBER
                      </p>
                    </Col>
                  </Row>
                  <Row>
                    <Col span={24}>
                      <p contentEditable className={styles.text}>
                        EX: 361263 JM GRAINS
                      </p>
                    </Col>
                  </Row>
                </Col>
              </Row>
            </Col>
          </Row>
          <div className={styles.marginDivide}></div>
          <Row justify={"space-between"} gutter={12} className={styles.border}>
            <Col span={12}>
              <h4 contentEditable className={styles.label}>
                DOCUMENTS REQUIRED FROM PACKER
              </h4>
            </Col>
            <Col span={12}>
              <h4 className={styles.label}>EMAIL TO</h4>
            </Col>
          </Row>{" "}
          <Row
            justify={"space-between"}
            gutter={12}
            className={styles.borderNotTop}
          >
            <Col span={12}>
              <p contentEditable className={styles.text}>
                PACKING LIST
              </p>
              <p contentEditable className={styles.text}>
                AO DOCS (ECR / CAR)
              </p>
              <p contentEditable className={styles.text}>
                FUMIGATION CERTIFICATE,
              </p>
              <p contentEditable className={styles.text}>
                TAX INVOICE
              </p>
            </Col>
            <Col span={12}>
              <p className={styles.text}>INFO@JMGRAINS.COM</p>
              <p contentEditable className={styles.text}>
                ATT : MANJULA LANEROLLE
              </p>
              <p className={styles.text}>PHONE : 0416780374</p>
            </Col>
          </Row>{" "}
        </Body>
      </div>

      <Footer />
    </div>
  );
};

export default PackingInstrictions;
