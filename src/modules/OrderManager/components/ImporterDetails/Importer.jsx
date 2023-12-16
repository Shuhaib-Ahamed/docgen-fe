import React from "react";
import ImporterForm from "@/modules/OrderManager/components/ImporterDetails/components/ImporterDetails/ImporterForm";
import { Divider } from "antd";

import styles from "./importer.module.less";
import CustomSelect from "@/components/CustomSelect/CustomSelect";
import { SELECT_TYPE } from "../../constants/common";

const Importer = (props) => {
  return (
    <div className={styles.formContainer}>
      <div className={styles.subContainer}>
        <h2 className={styles.heading}>Importer Details</h2> <Divider />
        <CustomSelect
          placeholder="Select Importer"
          style={{ width: "100%" }}
          renderType={SELECT_TYPE.IMPORT}
          items={[]}
        />
        <Divider />
        <ImporterForm {...props} />
      </div>
    </div>
  );
};

export default Importer;
