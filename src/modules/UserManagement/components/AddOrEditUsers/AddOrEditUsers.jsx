import React, { useEffect, useLayoutEffect } from "react";
import { Form, Input, Modal, Select, notification } from "antd";
import { ADD_USER, EDIT_USER, ROLE } from "../../constants/userConstants";
import { useDispatch, useSelector } from "react-redux";
import { crud } from "@/redux/crud/actions";
import Loading from "@/components/Loading";
import { selectCreatedItem, selectUpdatedItem } from "@/redux/crud/selectors";
import { selectAuth } from "@/redux/auth/selectors";

const AddOrEditUsers = (props) => {
  const [form] = Form.useForm();
  const { current: currentUser } = useSelector(selectAuth);
  const { isLoading: isCreateLoading, isSuccess: isCreateSuccess } =
    useSelector(selectCreatedItem);
  const { isLoading: isUpdateLoading, isSuccess: isUpdateSuccess } =
    useSelector(selectUpdatedItem);

  const dispatch = useDispatch();
  const { entity, title, data, visible, onSubmit, onCancel, type, ...rest } =
    props;

  const handleSubmit = () => {
    if (isCreateLoading || isUpdateLoading) {
      return;
    }

    form.submit();
    if (form.validateFields()) {
      if (type === ADD_USER) {
        const formFields = form.getFieldsValue([
          "email",
          "name",
          "password",
          "role",
        ]);
        dispatch(
          crud.create(entity, {
            ...formFields,
            goods: currentUser.goods ?? [],
            specifications: currentUser.specifications ?? [],
            importers: currentUser.importers ?? [],
          })
        );
      } else if (type === EDIT_USER && data?._id) {
        const formFields = form.getFieldsValue(["role", "email", "name"]);
        const { _id, __v, removed, isLoggedIn, enabled, createdAt, ...prev } =
          data;

        if (JSON.stringify(prev) !== JSON.stringify(formFields)) {
          dispatch(crud.update(entity, data?._id, formFields));
        } else {
          notification.warning({
            message: "No changes were made!!",
            description: "Please make any changes to update!",
            duration: 20,
          });
        }
      }
    }
  };

  useEffect(() => {
    if (data != null) {
      form.setFieldsValue({
        name: data?.name,
        email: data?.email,
        role: data?.role,
      });
    }

    return () => {
      form.resetFields();
    };
  }, [data]);

  useEffect(() => {
    if (isCreateSuccess || isUpdateSuccess) {
      onCancel();
      dispatch(crud.resetState());
    }
  }, [isCreateSuccess, isUpdateSuccess]);

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
          <Form.Item label="User Role" name="role">
            <Select
              defaultValue={ROLE.USER}
              options={[
                { value: ROLE.ADMIN, label: "Admin" },
                { value: ROLE.USER, label: "User" },
              ]}
            />
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
