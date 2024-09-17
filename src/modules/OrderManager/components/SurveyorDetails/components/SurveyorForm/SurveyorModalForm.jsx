import { Col, Form, Input, Row, Select } from "antd";
import { v4 as uuidv4 } from "uuid";
import {
  EDIT_SURVEYOR,
  ADD_SURVEYOR,
} from "@/modules/UserManagement/constants/userConstants";
import React, {
  Fragment,
  forwardRef,
  useEffect,
  useImperativeHandle,
} from "react";
import { countries } from "@/utils/countries";
import { useDispatch, useSelector } from "react-redux";
import { isEmpty } from "lodash";
import { selectAuth } from "@/redux/auth/selectors";
import { fetchUserData, updateUser } from "@/redux/auth/actions";

import styles from "./surveyorModalForm.module.less";

const { Option } = Select;

const SurveyorModalForm = forwardRef(({ data, type, onClose }, ref) => {
  const { current: currentUser, userLoading } = useSelector(selectAuth);
  const dispatch = useDispatch();
  const [form] = Form.useForm();

  const surveyors = currentUser?.surveyors ?? [];

  const onFinish = (values) => {
    if (userLoading) {
      return;
    }
    try {
      if (type === EDIT_SURVEYOR && data) {
        values.id = data.id;
        const filteredArr = surveyors?.filter(
          (item) => item?.id !== values?.id
        );
        dispatch(
          updateUser(currentUser?.id, {
            surveyors: [...(filteredArr || []), { ...values }],
          })
        );
      } else if (type === ADD_SURVEYOR) {
        values.id = uuidv4();
        dispatch(
          updateUser(currentUser?.id, {
            surveyors: [...(surveyors || []), { ...values }],
          })
        );
      }
    } catch (error) {
    } finally {
      dispatch(fetchUserData(currentUser?.id));
      onClose();
    }
  };

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

  const validateEmail = (rule, value, callback) => {
    const emailRegex = /^[A-Za-z0-9+_.-]+@(.+)$/;
    if (!emailRegex.test(value)) {
      callback("Invalid email address");
    } else {
      callback();
    }
  };

  useEffect(() => {
    if (!isEmpty(data)) {
      form.setFieldsValue({
        companyName: data.companyName,
        addressNo: data.addressNo,
        address: data.address,
        country: data.country,
        contactEmail: data.contactEmail,
        contactName: data.contactName,
      });
    }
  }, [data]);

  return (
    <Fragment>
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        disabled={userLoading}
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
        <Row gutter={32}>
          <Col span={12}>
            <Form.Item
              label="Contact Name"
              name="contactName"
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
              label="Email"
              name="contactEmail"
              rules={[
                { required: true, message: "Email is required" },
                { validator: validateEmail },
              ]}
            >
              <Input type="email" autoComplete="off" />
            </Form.Item>
          </Col>{" "}
        </Row>{" "}
       
      </Form>
    </Fragment>
  );
});

export default SurveyorModalForm;
