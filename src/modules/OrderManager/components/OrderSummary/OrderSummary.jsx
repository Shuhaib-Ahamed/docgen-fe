import React from "react";
import OrderDetailsForm from "@/modules/OrderManager/components/OrderSummary/components/OrderDetails/OrderDetailsForm";

import styles from "./orderDetails.module.less";

const OrderSummary = (props) => {
  return (
    <div className={styles.formContainer}>
      <div className={styles.subContainer}>
        <h2 className={styles.heading}>Order Summary</h2>
        <OrderDetailsForm {...props} />
      </div>
    </div>
  );
};

export default OrderSummary;
