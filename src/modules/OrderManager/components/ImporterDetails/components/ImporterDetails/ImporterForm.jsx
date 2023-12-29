import { Button, Col, Divider, Form, Input, Row, Select } from "antd";
import React, {
  Fragment,
  forwardRef,
  useEffect,
  useImperativeHandle,
} from "react";
import { countries } from "@/utils/countries";
import { useDispatch, useSelector } from "react-redux";
import {
  createOrder,
  updateOrder,
  updateOrderImporter,
} from "@/redux/order/actions";
import { getOrder } from "@/redux/order/selectors";
import { isEmpty } from "lodash";
import { selectAuth } from "@/redux/auth/selectors";
import styles from "./importerForm.module.less";

const { Option } = Select;

const ImporterForm = forwardRef(({ setCurrentStep, onClose }, ref) => {
  const {
    _id,
    importer,
    exporter,
    container,
    shipping,
    finance,
    surveys,
    isLoading,
  } = useSelector(getOrder);
  const { userLoading } = useSelector(selectAuth);
  const dispatch = useDispatch();
  const [form] = Form.useForm();

  useImperativeHandle(
    ref,
    () => {
      return {
        resetForm() {
          form?.resetFields();
        },
      };
    },
    []
  );

  const onFinish = (values) => {
    if (userLoading) {
      return;
    }

    try {
      dispatch(updateOrderImporter({ ...values }));
    } catch (error) {
    } finally {
      setCurrentStep(2);
    }
  };

  const handleOnClose = () => {
    if (isLoading) return;
    const orderObject = {
      _id: _id ?? null,
      status: "DRAFT",
      importer: importer,
      exporter: exporter,
      container: container,
      shipping: shipping,
      finance: finance,
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
    setCurrentStep(0);
  };

  useEffect(() => {
    if (!isEmpty(importer)) {
      form.setFieldsValue({
        companyName: importer.companyName,
        addressNo: importer.addressNo,
        address: importer.address,
        country: importer.country,
      });
    }
  }, [importer]);

  return (
    <Fragment>
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        disabled={isLoading}
      >
        <Row gutter={32}>
          <Col span={24}>
            <Form.Item
              label="Company Name"
              name="companyName"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Input autoComplete="off" />
            </Form.Item>
          </Col>{" "}
        </Row>{" "}
        <Row gutter={32}>
          <Col span={4}>
            <Form.Item
              label="Address No"
              name="addressNo"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Input autoComplete="off" />
            </Form.Item>
          </Col>
          <Col span={14}>
            <Form.Item
              label="Street Address"
              name="address"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Input autoComplete="off" />
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item
              label="Country"
              name="country"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Select
                showSearch
                placeholder="Country"
                className={styles.dateLable}
              >
                {countries.map((item, index) => (
                  <Option
                    key={index}
                    label={item.name.common}
                    value={item.name.common}
                  >
                    <div className={styles.option}>
                      <img className={styles.optionFlag} src={item.flags.svg} />
                      {item.name.common}
                    </div>
                  </Option>
                ))}
              </Select>
            </Form.Item>{" "}
          </Col>
        </Row>{" "}
        <div className={styles.buttonContainer}>
          <Divider />
          <Row gutter={24}>
            <Col span={4}>
              <Button
                className={styles.nextButton}
                onClick={() => handleBack()}
              >
                Back
              </Button>
            </Col>
            <Col span={20}>
              <Button
                type="primary"
                htmlType="submit"
                className={styles.nextButton}
              >
                Next
              </Button>
            </Col>
          </Row>
          <Button
            loading={userLoading}
            disabled={userLoading}
            onClick={() => handleOnClose()}
          >
            Save as draft & close
          </Button>
        </div>
      </Form>
    </Fragment>
  );
});

export default ImporterForm;
