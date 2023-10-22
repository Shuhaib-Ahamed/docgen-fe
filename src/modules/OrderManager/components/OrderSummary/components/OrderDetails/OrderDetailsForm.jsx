import React, { useRef, useState } from "react";

import ShippingDetails from "@/modules/OrderManager/components/OrderSummary/components/ShippingDetails/ShippingDetails";

import styles from "./orderDetailsForm.module.less";
import { Button, Col, Divider, Row } from "antd";
import ContainerDetails from "../ContainerDetails/ContainerDetails";
import FinancialDetails from "../FinacialDetails/FinancialDetails";
import { getOrder } from "@/redux/order/selectors";
import { useSelector } from "react-redux";

const OrderDetailsForm = ({ setCurrentStep, onClose }) => {
  const { isLoading, order } = useSelector(getOrder);
  const [isFormValid, setIsFormValid] = useState(false);
  const shippingDetailsFormRef = useRef(null);
  const containerDetailsFormRef = useRef(null);
  const orderDetailsFormRef = useRef(null);

  const handleOnClose = () => {
    onClose();
  };

  const handleBack = () => {
    setCurrentStep(1);
  };

  function handleSubmit() {
    try {
      const formRefs = [
        shippingDetailsFormRef,
        containerDetailsFormRef,
        orderDetailsFormRef,
      ];

      for (let formRef of formRefs) {
        formRef?.current?.submitForm();
      }
    } catch (error) {
      console.log("ERROR");
    } finally {
    }
  }

  return (
    <div className={styles.shippingContainer}>
      <FinancialDetails ref={orderDetailsFormRef} />
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
              loading={isLoading}
              disabled={isLoading}
            >
              Next
            </Button>
          </Col>
        </Row>
        <Button disabled={isLoading} onClick={() => handleOnClose()}>
          Save as draft & close
        </Button>
      </div>
    </div>
  );
};

export default OrderDetailsForm;
