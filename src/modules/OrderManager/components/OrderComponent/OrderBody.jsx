import React, { useState } from "react";
import { Steps } from "antd";
import PurchaseDetails from "@/modules/OrderManager/components/ExporterDetails/PurchaseDetails";
import SalesDetails from "@/modules/OrderManager/components/ImporterDetails/SalesDetails";
import OrderSummary from "@/modules/OrderManager/components/OrderSummary/OrderSummary";
import { getOrder } from "@/redux/order/selectors";
import { useDispatch, useSelector } from "react-redux";
import PDFView from "../PDVviews/PDFView";
import { resetCurrentOrderData } from "@/redux/order/actions";
import Surveyor from "../SurveyorDetails/Surveyor";

import styles from "./order.module.less";

const Step = Steps.Step;

const OrderBody = ({ onClose, setCurrent, current, isModalOpen }) => {
  const { status } = useSelector(getOrder);
  const dispatch = useDispatch();
  const setCurrentStep = (stepNumber) => {
    setCurrent(stepNumber);
  };

  const resetOnClose = () => {
    setCurrent(0);
    onClose();
    dispatch(resetCurrentOrderData());
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
          title="Purchase Details"
          onClick={() => handleStepClick(0)}
          className={status === "PUBLISHED" ? styles.steps : ""}
        ></Step>
        <Step
          title="Sales Details"
          onClick={() => handleStepClick(1)}
          className={status === "PUBLISHED" ? styles.steps : ""}
        ></Step>
        <Step
          title="Packing Instructions"
          onClick={() => handleStepClick(2)}
          className={status === "PUBLISHED" ? styles.steps : ""}
        ></Step>
        <Step
          title="Review and Upload"
          onClick={() => handleStepClick(4)}
          className={status === "PUBLISHED" ? styles.steps : ""}
        ></Step>
      </Steps>

      {(() => {
        switch (current) {
          case 0:
            return (
              <div className={styles.stepBody}>
                <PurchaseDetails
                  setCurrentStep={setCurrentStep}
                  onClose={resetOnClose}
                  isModalOpen={isModalOpen}
                />
              </div>
            );
          case 1:
            return (
              <div className={styles.stepBody}>
                <SalesDetails
                  setCurrentStep={setCurrentStep}
                  onClose={resetOnClose}
                  isModalOpen={isModalOpen}
                />
              </div>
            );
          case 2:
            return (
              <div className={styles.stepBody}>
                <Surveyor
                  setCurrentStep={setCurrentStep}
                  onClose={resetOnClose}
                  isModalOpen={isModalOpen}
                />
              </div>
            );
          case 4:
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
