import React, { useState } from "react";
import { Steps } from "antd";
import Exporter from "@/modules/OrderManager/components/ExporterDetails/Exporter";
import Importer from "@/modules/OrderManager/components/ImporterDetails/Importer";
import OrderSummary from "@/modules/OrderManager/components/OrderSummary/OrderSummary";

import styles from "./order.module.less";

const Step = Steps.Step;

const OrderBody = ({ onClose }) => {
  const [current, setCurrent] = useState(0);

  const setCurrentStep = (stepNumber) => {
    setCurrent(stepNumber);
  };

  const resetOnClose = () => {
    setCurrent(0);
    onClose();
  };

  return (
    <div className={styles.stepperContainer}>
      <Steps current={current}>
        <Step title="Exporter Details"></Step>
        <Step title="Importer Details"></Step>
        <Step title="Order Summary"></Step>
        <Step title="Review and Upload"></Step>
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
            return <div className={styles.stepBody}>Review & Upload</div>;
          default:
            return <div className={styles.stepBody}>Basic</div>;
        }
      })()}
    </div>
  );
};

export default OrderBody;
