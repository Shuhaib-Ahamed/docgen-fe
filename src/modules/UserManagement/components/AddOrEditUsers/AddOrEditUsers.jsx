import React, { useEffect } from "react";
import { Button, Form, Input, Modal, Space } from "antd";
import Loading from "@/components/Loading";
import { selectUpdatedItem } from "@/redux/crud/selectors";
import { EDIT_USER } from "../../constants/userConstants";
import { useSelector } from "react-redux";
import styles from "./addOrEdit.module.less";

const AddOrEditUsers = (props) => {
  const [form] = Form.useForm();
  const { title, data, visible, onSubmit, type, ...rest } = props;

  const { current, isLoading, isSuccess } = useSelector(selectUpdatedItem);

  const handleSubmit = () => {
    form.submit();
    console.log(form.getFieldsValue(["name", "email", "surname", "password"]));
  };

  useEffect(() => {
    if (data != null) {
      form.setFieldsValue({
        name: data?.name,
        surname: data?.surname,
        email: data?.email,
        password: "******************",
      });
    }

    return () => {
      form.resetFields();
    };
  }, [data]);

  return (
    <Modal
      title={title}
      visible={visible}
      onOk={() => handleSubmit()}
      destroyOnClose
      {...rest}
    >
      <Loading isLoading={isLoading}>
        <Form form={form} layout="vertical">
          <Form.Item
            label="First Name"
            name="name"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input autoComplete="off" />
          </Form.Item>
          <Form.Item
            label="Last Name"
            name="surname"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input autoComplete="off" />
          </Form.Item>
          <Form.Item
            label="E-mail"
            name="email"
            rules={[
              {
                required: true,
                message: "Please input your Email!",
              },
            ]}
          >
            <Input autoComplete="off" />
          </Form.Item>
          <Form.Item
            label="Password"
            name="password"
            rules={[
              {
                required: true,
                message: "Please input your Password!",
              },
            ]}
          >
            <Input type="password" autoComplete="off" />
          </Form.Item>
        </Form>
      </Loading>
    </Modal>
  );
};

export default AddOrEditUsers;
