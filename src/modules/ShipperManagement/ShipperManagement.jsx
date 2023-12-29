import React, { useCallback, useEffect, useRef, useState } from "react";

import {
  AutoComplete,
  Button,
  Card,
  Empty,
  Input,
  Modal,
  PageHeader,
  Space,
  Table,
} from "antd";
import { useDispatch, useSelector } from "react-redux";
import {
  DeleteFilled,
  EditFilled,
  LoadingOutlined,
  ReloadOutlined,
  SearchOutlined,
  UserAddOutlined,
} from "@ant-design/icons";
import { selectAuth } from "@/redux/auth/selectors";
import Loading from "@/components/Loading";
import ImporterModalForm from "../OrderManager/components/ImporterDetails/components/ImporterForm/ImporterModalForm";

import {
  ADD_SHIPPER,
  EDIT_SHIPPER,
} from "../UserManagement/constants/userConstants";
import { fetchUserData, updateUser } from "@/redux/auth/actions";
import { countries } from "@/utils/countries";
import { isUndefined } from "lodash";

import styles from "./shipperManagement.module.less";
import ShipperModalForm from "../OrderManager/components/ImporterDetails/components/ShipperForm/ShipperModalForm";

const initialState = {
  type: null,
  isOpen: false,
  data: null,
};

const initialDeleteState = {
  isModalOpen: false,
  selectedId: null,
  name: undefined,
};

const ShipperManagement = () => {
  const dispatch = useDispatch();
  const shipperFormRef = useRef(null);
  const { current: currentUser, userLoading } = useSelector(selectAuth);
  const [addEditModal, setAddOrEditModal] = useState(initialState);
  const [deleteModalConfig, setDeleteModalConfig] =
    useState(initialDeleteState);
  const [value, setValue] = useState("");
  const [options, setOptions] = useState();

  const shippers = currentUser?.shippers ?? [];

  const onSearch = (searchText) => {
    const mappedOutput = shippers
      ?.filter((item) =>
        item?.shippingCompany
          ?.toLowerCase()
          ?.includes(searchText?.toLowerCase())
      )
      .map((item) => ({
        label: item?.shippingCompany,
        value: item?.id,
      }));
    setOptions(mappedOutput);
  };

  const onSelect = (id) => {
    const findItem = shippers.find((item) => item.id === id);
    setValue(findItem?.shippingCompany ?? "");
    handleAddOrEdit(EDIT_SHIPPER, findItem);
  };

  const onChange = (data) => {
    const currentItem = options?.find((item) => {
      return item?.id === data;
    });
    setValue(currentItem?.label);
  };

  const handleAddOrEdit = (type, data) => {
    setAddOrEditModal({ type: type, isOpen: true, data: data || null });
  };

  const handleDelete = (data) => {
    setDeleteModalConfig({
      isModalOpen: true,
      selectedId: data?.id,
      name: data?.shippingCompany,
    });
  };

  const columns = [
    {
      title: "Shipper",
      dataIndex: "shippingCompany",
      key: "shippingCompany",
      sorter: (a, b) => a?.shippingCompany - b?.shippingCompany,
    },
    {
      title: "Contact Name",
      dataIndex: "shippingContactName",
      key: "shippingContactName",
    },
    {
      title: "Phone Number",
      dataIndex: "shippingContactNo",
      key: "shippingContactNo",
    },
    {
      title: "Actions",

      key: "actions",
      render: (rowData) => (
        <Space align="end">
          <Button
            icon={<EditFilled />}
            onClick={() => handleAddOrEdit(EDIT_SHIPPER, rowData)}
          >
            Edit
          </Button>
          <Button
            danger
            onClick={() => handleDelete(rowData)}
            icon={<DeleteFilled />}
          >
            Remove
          </Button>
        </Space>
      ),
    },
  ];

  const handelDataTableLoad = useCallback(() => {
    dispatch(fetchUserData(currentUser?.id));
  }, []);

  const handleSubmit = () => {
    shipperFormRef?.current?.submitForm();
  };

  const onDelete = () => {
    if (userLoading) {
      return;
    }
    try {
      if (!!deleteModalConfig.isModalOpen) {
        const newFiltered = shippers?.filter(
          (item) => item.id !== deleteModalConfig.selectedId
        );
        dispatch(
          updateUser(currentUser?.id, {
            shippers: newFiltered,
          })
        );
      }
    } finally {
      setDeleteModalConfig(initialDeleteState);
    }
  };

  useEffect(() => {
    handelDataTableLoad();
  }, []);

  return (
    <>
      <Card className={styles.cardContainer}>
        <div className="tableWrapper">
          <PageHeader
            onBack={() => window.history.back()}
            title="Shipper Management"
            ghost={false}
            extra={[
              <Button
                type="primary"
                icon={<UserAddOutlined />}
                onClick={() => handleAddOrEdit(ADD_SHIPPER)}
              >
                Add Shipper
              </Button>,
              <Button
                onClick={handelDataTableLoad}
                icon={userLoading ? <LoadingOutlined /> : <ReloadOutlined />}
              >
                Refresh
              </Button>,
            ]}
            style={{
              padding: "20px 0px",
            }}
          ></PageHeader>
          <Card>
            <AutoComplete
              value={value}
              options={options}
              style={{
                width: "100%",
              }}
              onSelect={onSelect}
              onSearch={onSearch}
              onChange={onChange}
              notFoundContent={<Empty />}
              allowClear={true}
              placeholder="Search Shippers"
            >
              <Input suffix={<SearchOutlined />} clearableInput />
            </AutoComplete>
          </Card>
          <Table
            columns={columns}
            rowKey={(item) => item._id}
            dataSource={shippers}
            loading={userLoading}
          />
        </div>
      </Card>
      <Modal
        title={addEditModal?.data ? "Edit Shipper" : "Add Shipper"}
        visible={addEditModal.isOpen}
        onOk={() => handleSubmit()}
        onCancel={() => setAddOrEditModal(initialState)}
        width={500}
        okText={addEditModal?.data ? "Edit Shipper" : "Add Shipper"}
        destroyOnClose
      >
        <Loading isLoading={userLoading ?? false}>
          <ShipperModalForm
            type={addEditModal?.type}
            data={addEditModal?.data ?? null}
            ref={shipperFormRef}
            onChange={handelDataTableLoad}
            onClose={() => setAddOrEditModal(initialState)}
          />
        </Loading>
      </Modal>
      <Modal
        title={"Remove Shipper"}
        visible={deleteModalConfig.isModalOpen}
        onOk={onDelete}
        okText="Remove Shipper"
        onCancel={() => setDeleteModalConfig(initialDeleteState)}
        confirmLoading={userLoading}
        okButtonProps={{
          danger: true,
        }}
      >
        <Loading isLoading={userLoading ?? false}>
          <p>
            Are you sure you want to delete?
            <br />
            <b>{deleteModalConfig.name}</b>
          </p>
        </Loading>
      </Modal>
    </>
  );
};

export default ShipperManagement;
