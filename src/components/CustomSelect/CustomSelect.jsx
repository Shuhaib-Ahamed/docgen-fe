import { Col, Form, Input, Modal, Row, Select } from "antd";
import React, { useState } from "react";
import { red } from "@ant-design/colors";
import { SELECT_TYPE } from "@/modules/OrderManager/constants/common";
import Loading from "../Loading";
import { selectAuth } from "@/redux/auth/selectors";
import { updateUser } from "@/redux/auth/actions";
import { useDispatch, useSelector } from "react-redux";
import { DeleteOutlined } from "@ant-design/icons";

export default function CustomSelect(props) {
  const {
    items = [],
    renderType = SELECT_TYPE.GOOD,
    defaultValue,
    placeholder,
    style,
    onClear,
    onChange: onSelectChange,
  } = props;

  const dispatch = useDispatch();
  const { current: currentUser, userLoading } = useSelector(selectAuth);
  const [form] = Form.useForm();
  const [visible, setVisible] = useState(false);
  const [visibleDelete, setDeleteVisible] = useState(false);
  const [selectedValue, setSelectedValue] = useState(defaultValue ?? "");

  const setDeleteView = (value) => {
    setDeleteVisible(value);
  };

  const onChange = (value) => {
    if (value === SELECT_TYPE.NEW_TYPE) {
      setVisible(true);
      return;
    }
    onSelectChange(value);
    setSelectedValue(value);
  };

  const handleDelete = () => {
    if (userLoading) {
      return;
    }
    form.submit();
    try {
      if (!!visibleDelete) {
        if (renderType === SELECT_TYPE.GOOD) {
          const newFiltered = currentUser?.goods?.filter(
            (item) => item !== visibleDelete
          );

          dispatch(
            updateUser(currentUser?.id, {
              goods: newFiltered,
            })
          );
        } else if (renderType === SELECT_TYPE.SPEC) {
          const newFiltered = currentUser?.specifications?.filter(
            (item) => item !== visibleDelete
          );
          dispatch(
            updateUser(currentUser?.id, {
              specifications: newFiltered,
            })
          );
        } else if (renderType === SELECT_TYPE.PACKER) {
          const newFiltered = currentUser?.packers?.filter(
            (item) => item !== visibleDelete
          );
          dispatch(
            updateUser(currentUser?.id, {
              packers: newFiltered,
            })
          );
        } else if (renderType === SELECT_TYPE.SAMPLE) {
          const newFiltered = currentUser?.samples?.filter(
            (item) => item !== visibleDelete
          );
          dispatch(
            updateUser(currentUser?.id, {
              samples: newFiltered,
            })
          );
        }
      }
    } finally {
      setDeleteVisible(false);
      setSelectedValue("");
    }
  };

  const handleSubmit = () => {
    if (userLoading) {
      return;
    }
    form.submit();
    try {
      if (form.validateFields()) {
        const { name } = form.getFieldsValue(["name"]);

        if (renderType === SELECT_TYPE.GOOD) {
          if (currentUser.goods?.includes(name)) {
            setSelectedValue(name);
            return;
          }

          const newGoods = [...(currentUser.goods ?? []), name];
          dispatch(
            updateUser(currentUser?.id, {
              goods: newGoods,
            })
          );
        } else if (renderType === SELECT_TYPE.SPEC) {
          if (currentUser.specifications?.includes(name)) {
            setSelectedValue(name);
            return;
          }
          const newSpecs = [...(currentUser.specifications ?? []), name];
          dispatch(
            updateUser(currentUser?.id, {
              specifications: newSpecs,
            })
          );
        } else if (renderType === SELECT_TYPE.PACKER) {
          if (currentUser.packers?.includes(name)) {
            setSelectedValue(name);
            return;
          }
          const newSpecs = [...(currentUser.packers ?? []), name];
          dispatch(
            updateUser(currentUser?.id, {
              packers: newSpecs,
            })
          );
        } else if (renderType === SELECT_TYPE.SAMPLE) {
          if (currentUser.samples?.includes(name)) {
            setSelectedValue(name);
            return;
          }
          const newSpecs = [...(currentUser.samples ?? []), name];
          dispatch(
            updateUser(currentUser?.id, {
              samples: newSpecs,
            })
          );
        }
        setSelectedValue(name);
      }
    } finally {
      form.resetFields();
      setVisible(false);
    }
  };

  const showDelete = (item) => {
    if (item) {
      return !!(selectedValue !== item);
    }
    return false;
  };

  return (
    <>
      <Modal
        title={"Add New Options"}
        visible={visible}
        onOk={() => handleSubmit()}
        onCancel={() => setVisible(false)}
        destroyOnClose
      >
        <Loading isLoading={userLoading ?? false}>
          <Form form={form} layout="vertical">
            <Form.Item
              label="Option Name"
              name="name"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Input autoComplete="off" />
            </Form.Item>
          </Form>
        </Loading>
      </Modal>
      <Modal
        title={"Delete Option"}
        visible={!!visibleDelete}
        onOk={handleDelete}
        okText="Remove Entity"
        onCancel={() => setDeleteVisible(false)}
        confirmLoading={userLoading}
        okButtonProps={{
          danger: true,
        }}
      >
        <Loading isLoading={userLoading ?? false}>
          <p>
            Are you sure you want to delete?
            <br />
            <b>{selectedValue}</b>
          </p>
        </Loading>
      </Modal>
      <Select
        value={selectedValue}
        placeholder={placeholder}
        style={style}
        allowClear
        onChange={onChange}
        showSearch
        onClear={onClear}
        loading={userLoading}
      >
        {items?.map((item) => (
          <Option key={item} value={item}>
            <Row justify="space-between">
              <Col>{item}</Col>
              {showDelete(item) && (
                <Col>
                  <DeleteOutlined
                    style={{ color: red[5] }}
                    onClick={() => setDeleteView(item)}
                  />
                </Col>
              )}
            </Row>
          </Option>
        ))}
        <Option value={SELECT_TYPE.NEW_TYPE}>Add New Option</Option>
      </Select>
    </>
  );
}
