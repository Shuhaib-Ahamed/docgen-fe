import React, { useRef } from "react";
import ImporterForm from "@/modules/OrderManager/components/ImporterDetails/components/ImporterDetails/ImporterForm";
import { Divider, Form } from "antd";
import CustomSelect from "@/components/CustomSelect/CustomSelect";
import { SELECT_TYPE } from "../../constants/common";
import { selectAuth } from "@/redux/auth/selectors";
import { useDispatch, useSelector } from "react-redux";
import { getOrder } from "@/redux/order/selectors";
import { updateOrderImporter } from "@/redux/order/actions";

import styles from "./importer.module.less";

const Importer = ({ setCurrentStep, onClose }) => {
  const importerFormRef = useRef(null);
  const { importer } = useSelector(getOrder);
  const { current: currentUser } = useSelector(selectAuth);
  const [form] = Form.useForm();
  const dispatch = useDispatch();

  const setImporter = (companyName) => {
    const foundImporter = currentUser?.importers?.find(
      (item) => item?.companyName === companyName
    );

    if (foundImporter ?? false) {
      dispatch(updateOrderImporter({ ...foundImporter }));
    }
  };

  const onClear = () => {
    dispatch(updateOrderImporter({}));
    importerFormRef?.current?.resetForm();
  };

  return (
    <div className={styles.formContainer}>
      <div className={styles.subContainer}>
        <h2 className={styles.heading}>Importer Details</h2> <Divider />
        <Form form={form} layout="vertical">
          <Form.Item label="Select Importer" name="name">
            <CustomSelect
              defaultValue={importer?.companyName}
              onClear={onClear}
              placeholder="Select Importer"
              onChange={(value) => setImporter(value)}
              items={currentUser?.importers ?? []}
              renderType={SELECT_TYPE.IMPORT}
            />
          </Form.Item>
        </Form>
        <Divider />
        <ImporterForm
          setCurrentStep={setCurrentStep}
          onClose={onClose}
          ref={importerFormRef}
        />
      </div>
    </div>
  );
};

export default Importer;
