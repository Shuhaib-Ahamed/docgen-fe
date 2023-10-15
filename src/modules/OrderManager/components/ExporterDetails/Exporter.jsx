import React from "react";
import ExporterForm from "./components/ExporterDetails/ExporterForm";
import { Divider } from "antd";

import styles from "./exporter.module.less";

const Exporter = (props) => {
  return (
    <div className={styles.formContainer}>
      <div className={styles.subContainer}>
        <h2 className={styles.heading}>Exporter Details</h2>
        <Divider />
        <ExporterForm {...props} />
      </div>
    </div>
  );
};

export default Exporter;
