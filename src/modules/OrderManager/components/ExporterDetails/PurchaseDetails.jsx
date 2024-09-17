import React, { useRef } from "react";
import PurchaseDetailsForm from "./components/PurchaseDetailsForm";

import styles from "./purchaseDetails.module.less";

const PurchaseDetails = (props) => {
  return (
    <div className={styles.formContainer}>
      <div className={styles.subContainer}>
        <h2 className={styles.heading}>Purchase Details</h2>
        <PurchaseDetailsForm {...props} />
      </div>
    </div>
  );
};

export default PurchaseDetails;
