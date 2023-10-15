import { Col, DatePicker, Divider, Form, Input, Row, Select } from "antd";
import { countries } from "@/utils/countries";
import React, {
  forwardRef,
  useImperativeHandle,
  useState,
  useEffect,
} from "react";

import styles from "./shippingDetails.module.less";

const { Option } = Select;

const ShippingDetails = forwardRef((_, ref) => {
  const [form] = Form.useForm();
  const [portLoadCountry, setLoadCountry] = useState("Sri Lanka");
  const [portDischargeCountry, setDischargeCountry] = useState("Australia");
  const [departureDate, setDepartureDate] = useState();

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
    setDepartureDate(dateString);
  };

  const onFinish = (values) => {
    const appendedValues = {
      departureDate: departureDate,
      portLoadCountry: portLoadCountry,
      portDischargeCountry: portDischargeCountry,
      ...values,
    };

    console.log(appendedValues);
  };

  useEffect(() => {
    form?.setFieldsValue({
      portLoadCountry: portLoadCountry,
      portDischargeCountry: portDischargeCountry,
    });
  }, []);

  return (
    <Form form={form} layout="vertical" onFinish={onFinish}>
      <h1 className={styles.subHeading}>Shipping Details</h1>
      <Divider className={styles.divider} />{" "}
      <Row gutter={32}>
        <Col span={8}>
          <Form.Item
            label="Shipping Company"
            name="shippingCompany"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input autoComplete="off" />
          </Form.Item>
        </Col>{" "}
        <Col span={8}>
          <Form.Item
            label="Contact Name"
            name="shippingContactName"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input autoComplete="off" />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item
            label="Contact To"
            name="shippingContactNo"
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
        <Col span={18}>
          <Form.Item
            label="Vessel Name"
            name="vesselName"
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
            label="Departure Date"
            name="departureDate"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <DatePicker className={styles.dateLable} onChange={onChange} />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={32}>
        <Col span={6}>
          <Form.Item
            label="Voyage Number"
            name="voyageNo"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input autoComplete="off" />
          </Form.Item>
        </Col>
        <Col span={18}>
          <Form.Item label="Transshipment" name="transshipment">
            <Input autoComplete="off" />
          </Form.Item>
        </Col>
      </Row>
      <div className={styles.highlightContainer}>
        <Row gutter={32}>
          <Col span={18}>
            <Form.Item
              label="Loading Port"
              name="portLoadName"
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
              label="Loading Country"
              name="portLoadCountry"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Select
                value={portLoadCountry}
                showSearch
                placeholder="Loading Port Country"
                className={styles.dateLable}
                onChange={(e) => {
                  setLoadCountry(e);
                  form.setFieldValue("portLoadCountry", e);
                }}
                defaultValue={"Sri Lanka"}
              >
                {countries?.map((item, index) => (
                  <Option
                    key={index}
                    label={item.name.common}
                    value={item.name.common}
                  >
                    <div className={styles.option}>
                      <img className={styles.optionFlag} src={item.flags.svg} />
                      {item?.name?.common}
                    </div>
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
        </Row>
      </div>
      <div className={styles.highlightContainer}>
        <Row gutter={32}>
          <Col span={18}>
            <Form.Item
              label="Discharging Port"
              name="portDischarge"
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
              label="Discharging Country"
              name="portDischargeCountry"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Select
                value={portDischargeCountry}
                showSearch
                placeholder="Discharge Port Country"
                className={styles.dateLable}
                onChange={(e) => {
                  setDischargeCountry(e);
                  form.setFieldValue("portDischargeCountry", e);
                }}
                defaultValue={"Australia"}
              >
                {countries.map((item, index) => (
                  <Option
                    key={index}
                    label={item.name.common}
                    value={item.name.common}
                  >
                    <div className={styles.option}>
                      <img className={styles.optionFlag} src={item.flags.svg} />
                      {item?.name.common}
                    </div>
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
        </Row>
      </div>{" "}
      <Row gutter={32}>
        <Col span={6}>
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
        <Col span={6}>
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
        <Col span={6}>
          <Form.Item
            label="Booking Reference"
            name="bookingRef"
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
            label="Sales Contract Number"
            name="salesContractNumber"
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
    </Form>
  );
});

export default ShippingDetails;
