import React, { useState } from "react";
import { Steps } from "antd";
import Exporter from "@/modules/OrderManager/components/ExporterDetails/Exporter";
import Importer from "@/modules/OrderManager/components/ImporterDetails/Importer";
import OrderSummary from "@/modules/OrderManager/components/OrderSummary/OrderSummary";
import { getOrder } from "@/redux/order/selectors";
import { useSelector } from "react-redux";
import PDFView from "../PDVviews/PDFView";

import styles from "./order.module.less";

const Step = Steps.Step;

const OrderBody = ({ onClose, setCurrent, current }) => {
  const { status } = useSelector(getOrder);
  const setCurrentStep = (stepNumber) => {
    setCurrent(stepNumber);
  };

  const resetOnClose = () => {
    setCurrent(0);
    onClose();
  };

  const handleStepClick = (key) => {
    if (status === "PUBLISHED") {
      setCurrent(key);
    }
  };

  return (
    <div
      className={`${styles.stepperContainer} ${
        current === 3 ? styles.viewContainer : ""
      }`}
    >
      <Steps current={current} responsive>
        <Step
          title="Exporter Details"
          onClick={() => handleStepClick(0)}
          className={status === "PUBLISHED" && styles.steps}
        ></Step>
        <Step
          title="Importer Details"
          onClick={() => handleStepClick(1)}
          className={status === "PUBLISHED" && styles.steps}
        ></Step>
        <Step
          title="Order Summary"
          onClick={() => handleStepClick(2)}
          className={status === "PUBLISHED" && styles.steps}
        ></Step>
        <Step
          title="Review and Upload"
          onClick={() => handleStepClick(3)}
          className={status === "PUBLISHED" && styles.steps}
        ></Step>
      </Steps>

      {(() => {
        switch (current) {
          case 0:
            return (
              <div className={styles.stepBody}>
                <Exporter
                  setCurrentStep={setCurrentStep}
                  onClose={resetOnClose}
                />
              </div>
            );
          case 1:
            return (
              <div className={styles.stepBody}>
                <Importer
                  setCurrentStep={setCurrentStep}
                  onClose={resetOnClose}
                />
              </div>
            );
          case 2:
            return (
              <div className={styles.stepBody}>
                <OrderSummary
                  setCurrentStep={setCurrentStep}
                  onClose={resetOnClose}
                />
              </div>
            );
          case 3:
            return (
              <div className={styles.stepBody}>
                <div className={styles.stepBody}>
                  <PDFView
                    setCurrentStep={setCurrentStep}
                    onClose={resetOnClose}
                  />
                </div>
              </div>
            );
          default:
            return (
              <div className={styles.stepBody}>
                <div className={styles.stepBody}>
                  <PDFView
                    setCurrentStep={setCurrentStep}
                    onClose={resetOnClose}
                  />
                </div>
              </div>
            );
        }
      })()}
    </div>
  );
};

export default OrderBody;
