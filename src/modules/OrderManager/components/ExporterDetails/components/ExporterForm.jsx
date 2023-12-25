import { Button, Col, Divider, Form, Input, Row, Select } from "antd";
import React, { Fragment, useEffect, useState } from "react";
import { expDetails } from "../constants/constants";
import { countries } from "@/utils/countries";
import { useDispatch, useSelector } from "react-redux";
import { getOrder } from "@/redux/order/selectors";
import { isEmpty } from "lodash";
import { createOrder, updateOrder } from "@/redux/order/actions";
const { Option } = Select;
import styles from "./exporterForm.module.less";

const ExporterForm = ({ setCurrentStep, onClose }) => {
  const { _id, importer, exporter, container, shipping, finance, isLoading } =
    useSelector(getOrder);
  const dispatch = useDispatch();
  const [form] = Form.useForm();

  const onFinish = (values) => {
    setCurrentStep(1);
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
    };

    if (orderObject._id) {
      dispatch(updateOrder(orderObject));
    } else {
      dispatch(createOrder(orderObject));
    }
    onClose();
  };

  useEffect(() => {
    if (!isEmpty(exporter)) {
      form.setFieldsValue({
        companyName: exporter.companyName,
        attendee: exporter.attendee,
        addressNo: exporter.addressNo,
        address: exporter.address,
        email: exporter.email,
        country: exporter.country,
        phoneNo: exporter.phoneNo,
      });
    } else {
      form.setFieldsValue({
        companyName: expDetails.companyName,
        attendee: expDetails.attendee,
        addressNo: expDetails.addressNo,
        address: expDetails.address,
        email: expDetails.email,
        country: expDetails.country,
        phoneNo: expDetails.phoneNo,
      });
    }
  }, []);

  return (
    <Fragment>
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        disabled={isLoading}
      >
        <Row gutter={32}>
          <Col span={18}>
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
          <Col span={6}>
            <Form.Item
              label="Attendee Name"
              name="attendee"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Input autoComplete="off" />
            </Form.Item>
          </Col>
        </Row>{" "}
        <Row gutter={32}>
          <Col span={6}>
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
          <Col span={12}>
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
        </Row>
        <Row gutter={32}>
          <Col span={12}>
            <Form.Item
              label="Email"
              name="email"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Input type="email" autoComplete="off" />
            </Form.Item>
          </Col>{" "}
          <Col span={12}>
            <Form.Item
              label="Phone Number"
              name="phoneNo"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Input autoComplete="off" />
            </Form.Item>
          </Col>
        </Row>
        <div className={styles.buttonContainer}>
          <Divider />
          <Button
            type="primary"
            htmlType="submit"
            className={styles.nextButton}
          >
            Next
          </Button>
          <Button onClick={() => handleOnClose()}>Save as draft & close</Button>
        </div>
      </Form>
    </Fragment>
  );
};

export default ExporterForm;
