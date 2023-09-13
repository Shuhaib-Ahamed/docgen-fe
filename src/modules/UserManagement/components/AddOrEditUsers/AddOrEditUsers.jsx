import React, { useEffect, useLayoutEffect } from "react";
import { Form, Input, Modal } from "antd";
import { ADD_USER, EDIT_USER } from "../../constants/userConstants";
import { useDispatch, useSelector } from "react-redux";
import { crud } from "@/redux/crud/actions";
import Loading from "@/components/Loading";
import {
  selectCreatedItem,
  selectListItems,
  selectUpdatedItem,
} from "@/redux/crud/selectors";
import styles from "./addOrEdit.module.less";

const AddOrEditUsers = (props) => {
  const [form] = Form.useForm();
  const { isLoading: isCreateLoading, isSuccess: isCreateSuccess } =
    useSelector(selectCreatedItem);
  const { isLoading: isUpdateLoading, isSuccess: isUpdateSuccess } =
    useSelector(selectUpdatedItem);
  const { isLoading: isListLoading } = useSelector(selectListItems);

  const dispatch = useDispatch();
  const { entity, title, data, visible, onSubmit, onCancel, type, ...rest } =
    props;

  const handleSubmit = () => {
    try {
      form.submit();
      if (form.validateFields()) {
        if (type === ADD_USER) {
          const formFields = form.getFieldsValue([
            "email",
            "name",
            "surname",
            "password",
          ]);
          dispatch(crud.create(entity, formFields));
        } else if (type === EDIT_USER && data?._id) {
          const formFields = form.getFieldsValue(["email", "name", "surname"]);
          const { _id, __v, removed, isLoggedIn, enabled, createdAt, ...prev } =
            data;
          if (JSON.stringify(prev) !== JSON.stringify(formFields)) {
            dispatch(crud.update(entity, data?._id, formFields));
          }
        }
      }
    } catch (error) {
    } finally {
      onCancel();
    }
  };

  useEffect(() => {
    if (data != null) {
      form.setFieldsValue({
        name: data?.name,
        surname: data?.surname,
        email: data?.email,
      });
    }

    return () => {
      form.resetFields();
    };
  }, [data]);

  useLayoutEffect(() => {
    dispatch(crud.resetState());
  }, []);

  return (
    <Modal
      title={title}
      visible={visible}
      onOk={() => handleSubmit()}
      onCancel={onCancel}
      destroyOnClose
      {...rest}
    >
      <Loading isLoading={isCreateLoading || isUpdateLoading}>
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

          {type === ADD_USER && (
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
          )}
        </Form>
      </Loading>
    </Modal>
  );
};

export default AddOrEditUsers;
