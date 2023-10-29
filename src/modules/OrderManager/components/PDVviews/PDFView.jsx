import { Collapse } from "antd";
import React from "react";

import styles from "./pdfView.module.less";
import Invoice from "./Invoice/Invoice";
import PackingInstrictions from "./PackingInstructions/PackingInstrictions";
import SalesContract from "./SalesContract/SalesContract";

const { Panel } = Collapse;

const text = `
  A dog is a type of domesticated animal.
  Known for its loyalty and faithfulness,
  it can be found as a welcome guest in many households across the world.
`;

const PDFView = ({ setCurrentStep, onClose }) => {
  const handleOnClose = () => {
    onClose();
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
      <div className={styles.subContainer}>
        <h2 className={styles.heading}>Review & Upload</h2>
        <Collapse defaultActiveKey={["1"]} accordion>
          <Panel header={getComercialHeader()} key="1">
            <div className={styles.wrapper}>
              <page className={styles.pdf} size="A4">
                <Invoice />
              </page>
            </div>
          </Panel>
          <Panel header={getPackingHeading()} key="2">
            <div className={styles.wrapper}>
              <page className={styles.pdf} size="A4">
                <PackingInstrictions />
              </page>
            </div>
          </Panel>
          <Panel header={getContractHeader()} key="3">
            <div className={styles.wrapper}>
              <page className={styles.pdf} size="A4">
                <SalesContract />
              </page>
            </div>
          </Panel>
        </Collapse>
      </div>
    </div>
  );
};

export default PDFView;
