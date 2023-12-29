import { Col, Form, Input, Row, Select } from "antd";
import { v4 as uuidv4 } from "uuid";
import {
  ADD_SHIPPER,
  EDIT_SHIPPER,
} from "@/modules/UserManagement/constants/userConstants";
import React, {
  Fragment,
  forwardRef,
  useEffect,
  useImperativeHandle,
} from "react";

import { useDispatch, useSelector } from "react-redux";
import { isEmpty } from "lodash";
import { selectAuth } from "@/redux/auth/selectors";
import { fetchUserData, updateUser } from "@/redux/auth/actions";

const ShipperModalForm = forwardRef(({ data, type, onClose }, ref) => {
  const { current: currentUser, userLoading } = useSelector(selectAuth);
  const dispatch = useDispatch();
  const [form] = Form.useForm();

  const shippers = currentUser?.shippers ?? [];

  const onFinish = (values) => {
    if (userLoading) {
      return;
    }
    try {
      if (type === EDIT_SHIPPER && data) {
        values.id = data.id;
        const filteredArr = shippers?.filter((item) => item?.id !== values?.id);
        dispatch(
          updateUser(currentUser?.id, {
            shippers: [...(filteredArr || []), { ...values }],
          })
        );
      } else if (type === ADD_SHIPPER) {
        values.id = uuidv4();
        dispatch(
          updateUser(currentUser?.id, {
            shippers: [...(shippers || []), { ...values }],
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

  useEffect(() => {
    if (!isEmpty(data)) {
      form.setFieldsValue({
        shippingCompany: data.shippingCompany,
        shippingContactName: data.shippingContactName,
        shippingContactNo: data.shippingContactNo,
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
          </Col>
        </Row>{" "}
        <Row gutter={32}>
          {" "}
          <Col span={24}>
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
        </Row>
        <Row gutter={32}>
          {" "}
          <Col span={24}>
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
      </Form>
    </Fragment>
  );
});

export default ShipperModalForm;
