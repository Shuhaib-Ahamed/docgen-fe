import React, { useEffect, useLayoutEffect, useRef } from "react";

import ShippingDetails from "@/modules/OrderManager/components/OrderSummary/components/ShippingDetails/ShippingDetails";
import { BackTop, Button, Col, Divider, Row } from "antd";
import ContainerDetails from "../ContainerDetails/ContainerDetails";
import FinancialDetails from "../FinacialDetails/FinancialDetails";
import { getOrder } from "@/redux/order/selectors";
import { useSelector } from "react-redux";
import { isEmpty } from "lodash";

import styles from "./orderDetailsForm.module.less";

const OrderDetailsForm = ({ setCurrentStep, onClose }) => {
  const { isLoading, shipping, finance, container } = useSelector(getOrder);
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
      if (!isEmpty(shipping) && !isEmpty(finance) && !isEmpty(container)) {
        setCurrentStep(3);
        document?.getElementsByClassName("ant-drawer-body")[0]?.scrollTo(0, 0);
      }
    }
  }

  return (
    <div className={styles.shippingContainer}>
      <BackTop
        visible={true}
        onClick={() => {
          document
            ?.getElementsByClassName("ant-drawer-body")[0]
            ?.scrollTo(0, 0);
        }}
      />
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
