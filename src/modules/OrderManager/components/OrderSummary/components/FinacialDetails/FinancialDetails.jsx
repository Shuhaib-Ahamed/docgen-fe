import { Col, Divider, Form, Input, InputNumber, Row } from "antd";
import React, { forwardRef, useImperativeHandle } from "react";

import styles from "./financialDetails.module.less";
import TextArea from "antd/lib/input/TextArea";

const FinancialDetails = forwardRef((_, ref) => {
  const [form] = Form.useForm();

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

  const onFinish = (values) => {
    const appendedValues = {
      releaseDate: releaseDate,
      ...values,
    };

    console.log(appendedValues);
  };

  const handleTotalCount = () => {
    const qty = form.getFieldValue("quantity");
    const usdValue = form.getFieldValue("usdMT");

    if (qty && usdValue) {
      const total = (qty * usdValue).toFixed(2);
      form.setFieldValue("total", total);
    } else {
      form.setFieldValue("total", undefined);
    }
  };

  return (
    <Form form={form} layout="vertical" onFinish={onFinish}>
      <h1 className={styles.subHeading}>Order Details</h1>
      <Divider className={styles.divider} />{" "}
      <Row gutter={32}>
        <Col span={12}>
          <Form.Item
            label="Name of the Good"
            name="name"
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
            label="Specification / Grade"
            name="specification"
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
        <Col span={8}>
          <Form.Item
            label="Quantity (MT)"
            name="quantity"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input
              type="number"
              onChange={handleTotalCount}
              autoComplete="off"
            />
          </Form.Item>
        </Col>{" "}
        <Col span={8}>
          <Form.Item
            label="USD Per MT"
            name="usdMT"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <InputNumber
              className={styles.dateLable}
              formatter={(value) =>
                `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
              }
              parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
              onChange={handleTotalCount}
            />
          </Form.Item>
        </Col>{" "}
        <Col span={8}>
          <Form.Item
            label="Total Amount"
            name="total"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <InputNumber
              className={styles.dateLable}
              formatter={(value) =>
                `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
              }
              parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
            />
          </Form.Item>
        </Col>{" "}
      </Row>
      <Row gutter={32}>
        <Col span={24}>
          <Form.Item
            label="Description of the goods"
            name="description"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <TextArea autoComplete="off" />
          </Form.Item>
        </Col>{" "}
      </Row>{" "}
      <Row gutter={32}>
        <Col span={12}>
          <Form.Item
            label="EDN Number"
            name="edn"
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
            label="RFP Number"
            name="rfp"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input type="number" autoComplete="off" />
          </Form.Item>
        </Col>{" "}
      </Row>{" "}
    </Form>
  );
});

export default FinancialDetails;
