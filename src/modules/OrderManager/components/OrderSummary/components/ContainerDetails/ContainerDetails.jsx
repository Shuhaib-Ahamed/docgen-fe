import { Col, DatePicker, Divider, Form, Input, Row, Select } from "antd";
import React, { forwardRef, useImperativeHandle, useState } from "react";

import styles from "./containerDetails.module.less";

const ContainerDetails = forwardRef((_, ref) => {
  const [form] = Form.useForm();
  const [releaseDate, setReleaseDate] = useState();

  useImperativeHandle(
    ref,
    () => {
      return {
        submitForm() {
          form?.submit();
        },
      };
    },
    []
  );

  const onChange = (_, dateString) => {
    setReleaseDate(dateString);
  };

  const onFinish = (values) => {
    const appendedValues = {
      releaseDate: releaseDate,
      ...values,
    };

    console.log(appendedValues);
  };

  return (
    <Form form={form} layout="vertical" onFinish={onFinish}>
      <h1 className={styles.subHeading}>Container Details</h1>
      <Divider className={styles.divider} />{" "}
      <Row gutter={32}>
        <Col span={12}>
          <Form.Item
            label="Container Release Number"
            name="releaseNumber"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input autoComplete="off" />
          </Form.Item>
        </Col>{" "}
        <Col span={12}>
          <Form.Item label="Container Release Date" name="releaseDate">
            <DatePicker className={styles.dateLable} onChange={onChange} />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={32}>
        <Col span={12}>
          <Form.Item
            label="Releasing From"
            name="releaseFrom"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input autoComplete="off" />
          </Form.Item>
        </Col>{" "}
        <Col span={12}>
          <Form.Item
            label="Releasing To"
            name="releaseTo"
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
      <Row gutter={32}>
        <Col span={12}>
          <Form.Item
            label="FCL Size"
            name="fclSize"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input autoComplete="off" />
          </Form.Item>
        </Col>{" "}
        <Col span={12}>
          <Form.Item
            label="Number of FCL"
            name="fclNo"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input autoComplete="off" />
          </Form.Item>
        </Col>{" "}
      </Row>
    </Form>
  );
});

export default ContainerDetails;
