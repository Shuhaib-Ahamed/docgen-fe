import React, { useRef } from "react";
import SurveyorForm from "./components/SurveyorDetails/SurveyorForm";
import { Col, Divider, Form, Row, Select } from "antd";
import { selectAuth } from "@/redux/auth/selectors";
import { useDispatch, useSelector } from "react-redux";
import { getOrder } from "@/redux/order/selectors";
import { addSurveyDetails, updateOrderImporter } from "@/redux/order/actions";

import styles from "./surveyor.module.less";

const Surveyor = ({ setCurrentStep, onClose }) => {
  const surveyorFormRef = useRef(null);
  const { surveys } = useSelector(getOrder);
  const { current: currentUser, userLoading } = useSelector(selectAuth);
  const [form] = Form.useForm();
  const dispatch = useDispatch();

  const setSurveyor = (id) => {
    const foundSurveyor = currentUser?.surveyors?.find(
      (item) => item?.id === id
    );

    if (foundSurveyor ?? false) {
      dispatch(addSurveyDetails({ ...foundSurveyor }));
    }
  };

  const onClear = () => {
    dispatch(addSurveyDetails({}));
    surveyorFormRef?.current?.resetForm();
  };

  return (
    <div className={styles.formContainer}>
      <div className={styles.subContainer}>
        <h2 className={styles.heading}>Surveyor Details</h2> <Divider />
        <Form form={form} layout="vertical">
          <Form.Item label="Select Surveyor" name="name">
            <Select
              defaultValue={surveys?.companyName ?? ""}
              placeholder="Select Surveyor"
              allowClear
              showSearch
              onClear={onClear}
              loading={userLoading}
              onChange={(value) => setSurveyor(value)}
            >
              {currentUser?.surveyors?.map((item) => (
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
        <SurveyorForm
          setCurrentStep={setCurrentStep}
          onClose={onClose}
          ref={surveyorFormRef}
        />
      </div>
    </div>
  );
};

export default Surveyor;
