import React from "react";
import ImporterForm from "@/modules/OrderManager/components/ImporterDetails/components/ImporterDetails/ImporterForm";
import { Divider } from "antd";

import styles from "./importer.module.less";

const Importer = (props) => {
  return (
    <div className={styles.formContainer}>
      <div className={styles.subContainer}>
        <h2 className={styles.heading}>Importer Details</h2>
        <Divider />
        <ImporterForm {...props} />
      </div>
    </div>
  );
};

export default Importer;
