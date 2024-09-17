import React, { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import ShippingDetails from "@/modules/OrderManager/components/OrderSummary/components/ShippingDetails/ShippingDetails";
import { BackTop, Button, Col, Divider, Row } from "antd";
import ContainerDetails from "../ContainerDetails/ContainerDetails";
import FinancialDetails from "../FinacialDetails/FinancialDetails";
import { isEmpty } from "lodash";

import styles from "./orderDetailsForm.module.less";
import { getOrder } from "@/redux/order/selectors";
import { createOrder, updateOrder } from "@/redux/order/actions";

const OrderDetailsForm = ({
  setCurrentStep,
  onClose,
  isLoading,
  shipping,
  finance,
  container,
}) => {
  const {
    _id,
    importer: orderImporter,
    exporter: orderExporter,
    container: orderContainer,
    shipping: orderShipping,
    finance: orderFinance,
    isLoading: isOrderLoading,
    surveys: surveys,
  } = useSelector(getOrder);
  const dispatch = useDispatch();
  const shippingDetailsFormRef = useRef(null);
  const containerDetailsFormRef = useRef(null);
  const orderDetailsFormRef = useRef(null);

  const handleOnClose = () => {
    if (isOrderLoading) return;
    const orderObject = {
      _id: _id ?? null,
      status: "DRAFT",
      importer: orderImporter,
      exporter: orderExporter,
      container: orderContainer,
      shipping: orderShipping,
      finance: orderFinance,
      surveys: surveys,
    };

    if (orderObject._id) {
      dispatch(updateOrder(orderObject));
    } else {
      dispatch(createOrder(orderObject));
    }
    onClose();
  };

  const handleBack = () => {
    setCurrentStep(2);
  };

  const handleSubmit = () => {
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
        setCurrentStep(4);
        document?.getElementsByClassName("ant-drawer-body")[0]?.scrollTo(0, 0);
      }
    }
  };

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
