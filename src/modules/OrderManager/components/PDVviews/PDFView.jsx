import { BackTop, Button, Col, Collapse, Divider, Row } from "antd";
import React, { useRef } from "react";
import { useSelector } from "react-redux";
import { getOrder } from "@/redux/order/selectors";
import generatePDF, { Resolution, Margin } from "react-to-pdf";
import Invoice from "./Invoice/Invoice";
import PackingInstrictions from "./PackingInstructions/PackingInstrictions";
import SalesContract from "./SalesContract/SalesContract";

import styles from "./pdfView.module.less";

const { Panel } = Collapse;

const options = (filename) => ({
  filename: filename,
  method: "save",
  resolution: Resolution.MEDIUM,
  page: {
    format: "A4",
    margin: Margin.SMALL,
  },
  canvas: {
    mimeType: "image/jpeg",
    qualityRatio: 1,
  },
  overrides: {
    pdf: {
      compress: true,
    },
    canvas: {
      useCORS: true,
    },
  },
});

const optionsA3 = (filename) => ({
  filename: filename,
  method: "save",
  resolution: Resolution.MEDIUM,
  page: {
    format: "A3",
    margin: Margin.SMALL,
  },
  canvas: {
    mimeType: "image/jpeg",
    qualityRatio: 1,
  },
  overrides: {
    pdf: {
      compress: true,
    },
    canvas: {
      useCORS: true,
    },
  },
});

const PDFView = ({ setCurrentStep, onClose }) => {
  const invoiceRef = useRef(null);
  const packingRef = useRef(null);
  const salesRef = useRef(null);
  const { importer, exporter, container, shipping, finance } =
    useSelector(getOrder);

  const handleOnClose = () => {
    onClose();
  };

  const downloadDocuments = () => {
    const refs = [invoiceRef, packingRef, salesRef];
    const filenames = ["invoice.pdf", "packing.pdf", "sales.pdf"];

    refs.forEach((ref, index) => {
      const currentOptions =
        ref === packingRef
          ? optionsA3(filenames[index])
          : options(filenames[index]);
      generatePDF(ref, currentOptions);
    });
  };

  const handleBack = () => {
    setCurrentStep(2);
  };

  const getComercialHeader = () => (
    <h1 className={styles.headerTag}>Commercial Invoice</h1>
  );
  const getPackingHeading = () => (
    <h1 className={styles.headerTag}>Packing Instructions</h1>
  );
  const getContractHeader = () => (
    <h1 className={styles.headerTag}>Sales Contract</h1>
  );

  return (
    <div className={styles.viewContainer}>
      <BackTop
        visible={true}
        onClick={() => {
          document
            ?.getElementsByClassName("ant-drawer-body")[0]
            ?.scrollTo(0, 0);
        }}
      />
      <div className={styles.subContainer}>
        <h2 className={styles.heading}>Review & Upload</h2>
        <Collapse defaultActiveKey={["1", "2", "3"]}>
          <Panel forceRender header={getComercialHeader()} key="1">
            <div className={styles.wrapper}>
              <div className={styles.pdf} ref={invoiceRef}>
                <div className={styles.a4Pdf}>
                  <Invoice
                    importer={importer}
                    exporter={exporter}
                    container={container}
                    shipping={shipping}
                    finance={finance}
                  />
                </div>
              </div>
            </div>
          </Panel>
          <Panel forceRender header={getPackingHeading()} key="2">
            <div className={styles.wrapper}>
              <div className={styles.pdf} ref={packingRef}>
                <div className={styles.a3Pdf}>
                  <PackingInstrictions
                    importer={importer}
                    exporter={exporter}
                    container={container}
                    shipping={shipping}
                    finance={finance}
                  />
                </div>
              </div>
            </div>
          </Panel>
          <Panel forceRender header={getContractHeader()} key="3">
            <div className={styles.wrapper}>
              <div className={styles.pdf} ref={salesRef}>
                <div className={styles.a4Pdf}>
                  <SalesContract
                    importer={importer}
                    exporter={exporter}
                    container={container}
                    shipping={shipping}
                    finance={finance}
                  />
                </div>
              </div>
            </div>
          </Panel>
        </Collapse>{" "}
        <div className={styles.buttonContainer}>
          <Divider />
          <Row gutter={24}>
            <Col span={4}>
              <Button
                className={styles.nextButton}
                onClick={() => handleBack()}
              >
                Back
              </Button>
            </Col>
            <Col span={20}>
              <Button
                type="primary"
                htmlType="submit"
                className={styles.nextButton}
                onClick={() => downloadDocuments()}
              >
                Save & Download Documents
              </Button>
            </Col>
          </Row>
          <Button onClick={() => handleOnClose()}>Save as draft & close</Button>
        </div>
      </div>
    </div>
  );
};

export default PDFView;
