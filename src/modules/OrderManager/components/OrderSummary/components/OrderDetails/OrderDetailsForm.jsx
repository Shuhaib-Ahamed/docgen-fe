import React, { useRef } from "react";

import ShippingDetails from "@/modules/OrderManager/components/OrderSummary/components/ShippingDetails/ShippingDetails";

import styles from "./orderDetailsForm.module.less";
import { Button, Col, Divider, Row } from "antd";
import ContainerDetails from "../ContainerDetails/ContainerDetails";

const OrderDetailsForm = ({ setCurrentStep, onClose }) => {
  const shippingDetailsFormRef = useRef(null);
  const containerDetailsFormRef = useRef(null);

  const handleOnClose = () => {
    onClose();
  };

  const handleBack = () => {
    setCurrentStep(1);
  };

  function handleSubmit() {
    shippingDetailsFormRef?.current?.submitForm();
    containerDetailsFormRef?.current?.submitForm();
  }

  return (
    <div className={styles.shippingContainer}>
      <ShippingDetails ref={shippingDetailsFormRef} />
      <ContainerDetails ref={containerDetailsFormRef} />

      <div className={styles.buttonContainer}>
        <Divider />
        <Row gutter={24}>
          <Col span={4}>
            <Button className={styles.nextButton} onClick={() => handleBack()}>
              Back
            </Button>
          </Col>
          <Col span={20}>
            <Button
              type="primary"
              onClick={() => handleSubmit()}
              className={styles.nextButton}
            >
              Next
            </Button>
          </Col>
        </Row>
        <Button onClick={() => handleOnClose()}>Save as draft & close</Button>
      </div>
    </div>
  );
};

export default OrderDetailsForm;
