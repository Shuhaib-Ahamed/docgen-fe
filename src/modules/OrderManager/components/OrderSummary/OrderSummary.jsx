import React, { useState } from "react";
import { Button } from "antd";
import OrderDetailsForm from "@/modules/OrderManager/components/OrderSummary/components/OrderDetails/OrderDetailsForm";

import styles from "./orderDetails.module.less";
import { getOrder } from "@/redux/order/selectors";
import { useSelector } from "react-redux";
import PreviewModal from "../PreviewModal/PreviewModal";
import { MODAL_TYPE } from "../../constants/common";

const initialPercentage = {
  sales: 0,
  comercial: 0,
  packing: 0,
};

const OrderSummary = (props) => {
  const { isLoading, shipping, finance, container } = useSelector(getOrder);
  const [showPreview, setShowPreview] = useState(false);
  const [previewType, setPreviewType] = useState("");

  const handleOpenModal = (type) => {
    setPreviewType(type);
    setShowPreview(true);
  };

  return (
    <div className={styles.formContainer}>
      <div className={styles.subContainer}>
        <h2 className={styles.heading}>Order Summary</h2>
        <div className={styles.buttonWarpper}>
          <Button
            className={styles.singleProgressButton}
            onClick={() => handleOpenModal(MODAL_TYPE.SALES)}
          >
            <p className={styles.heading}>Sales Contract</p>
            <p className={styles.subText}>View PDF</p>
          </Button>
          <Button
            className={styles.singleProgressButton}
            onClick={() => handleOpenModal(MODAL_TYPE.PACKING)}
          >
            <p className={styles.heading}>Packing Details</p>
            <p className={styles.subText}>View PDF</p>
          </Button>
          <Button
            className={styles.singleProgressButton}
            onClick={() => handleOpenModal(MODAL_TYPE.COMERCIAL)}
          >
            <p className={styles.heading}>Comercial Invoice</p>
            <p className={styles.subText}>View PDF</p>
          </Button>
        </div>
        <div className={styles.buttonWarpper}>
          <Button
            className={styles.singleRFPButton}
            onClick={() => handleOpenModal(MODAL_TYPE.OCR)}
          >
            <p className={styles.heading}>Extract RFP Information</p>
            <p className={styles.subText}>
              Upload RFP Documents & Extract Information
            </p>
          </Button>
        </div>

        <OrderDetailsForm
          isLoading={isLoading}
          shipping={shipping}
          finance={finance}
          container={container}
          {...props}
        />
      </div>
      <PreviewModal
        visible={showPreview}
        setVisible={setShowPreview}
        type={previewType}
        title={
          previewType === MODAL_TYPE.SALES
            ? "Sales Preview"
            : previewType === MODAL_TYPE.PACKING
            ? "Packing Preview"
            : previewType === MODAL_TYPE.COMERCIAL
            ? "Comercial Invoice Preview"
            : "Extract Information"
        }
        onCancel={() => setShowPreview(false)}
        centered
        okText={
          previewType === MODAL_TYPE.OCR
            ? "Extract Information"
            : "Download PDF"
        }
      />
    </div>
  );
};

export default OrderSummary;
