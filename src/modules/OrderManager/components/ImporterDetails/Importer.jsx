import React, { useRef } from "react";
import ImporterForm from "@/modules/OrderManager/components/ImporterDetails/components/ImporterDetails/ImporterForm";
import { Col, Divider, Form, Row, Select } from "antd";
import { selectAuth } from "@/redux/auth/selectors";
import { useDispatch, useSelector } from "react-redux";
import { getOrder } from "@/redux/order/selectors";
import { updateOrderImporter } from "@/redux/order/actions";

import styles from "./importer.module.less";

const Importer = ({ setCurrentStep, onClose }) => {
  const importerFormRef = useRef(null);
  const { importer } = useSelector(getOrder);
  const { current: currentUser, userLoading } = useSelector(selectAuth);
  const [form] = Form.useForm();
  const dispatch = useDispatch();

  const setImporter = (id) => {
    const foundImporter = currentUser?.importers?.find(
      (item) => item?.id === id
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
            <Select
              defaultValue={importer?.companyName ?? ""}
              placeholder="Select Importer"
              allowClear
              showSearch
              onClear={onClear}
              loading={userLoading}
              onChange={(value) => setImporter(value)}
            >
              {currentUser?.importers?.map((item) => (
                <Option key={item?.companyName} value={item?.id}>
                  <Row justify="space-between">
                    <Col>{item?.companyName}</Col>
                  </Row>
                </Option>
              ))}
            </Select>
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
