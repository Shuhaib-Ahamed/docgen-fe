import React, { useCallback, useEffect, useState } from "react";
import styles from "./userManagement.module.less";
import { Button, Card, Modal, PageHeader, Space, Table, Tag } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { crud } from "@/redux/crud/actions";
import { selectListItems } from "@/redux/crud/selectors";
import {
  DeleteFilled,
  EditFilled,
  LoadingOutlined,
  ReloadOutlined,
  UserAddOutlined,
} from "@ant-design/icons";
import SearchItem from "@/components/SearchItem";
import { ADD_USER, EDIT_USER } from "./constants/userConstants";
import AddOrEditUsers from "./components/AddOrEditUsers/AddOrEditUsers";

const initialState = {
  type: null,
  isOpen: false,
  data: null,
};

const UserManagement = () => {
  const entity = "admin";
  const { result: listResult, isLoading: listIsLoading } =
    useSelector(selectListItems);
  const [addEditModal, setAddOrEditModal] = useState(initialState);
  const { pagination, items } = listResult;

  const dispatch = useDispatch();

  const handelDataTableLoad = useCallback((pagination) => {
    if (!listIsLoading) {
      dispatch(crud.list(entity, pagination.current));
    }
  }, []);

  const handleAddOrEditUser = (type, data) => {
    setAddOrEditModal({ type: type, isOpen: true, data: data || null });
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      sorter: (a, b) => a.name - b.name,
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      sorter: (a, b) => a.email - b.email,
    },

    {
      title: "Surname",
      dataIndex: "surname",
      key: "surname",
    },
    {
      title: "Status",
      dataIndex: "isRemoved",
      key: "isRemoved",
      render: (_, { isRemoved }) => (
        <Tag color={isRemoved ? "orange" : "green"}>
          {isRemoved ? "INACTIVE" : "ACTIVE"}
        </Tag>
      ),
    },
    {
      title: "Actions",

      key: "actions",
      render: (rowData) => (
        <Space align="end">
          <Button
            icon={<EditFilled />}
            onClick={() => handleAddOrEditUser(EDIT_USER, rowData)}
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

  const handleDelete = (id) => {};

  const onSearchSelect = (id) => {
    const rowData = items?.find((item) => item._id === id);
    setTimeout(() => {
      handleAddOrEditUser(EDIT_USER, rowData);
    }, 300);
  };

  useEffect(() => {
    dispatch(crud.list(entity));
  }, []);

  return (
    <>
      <Card className={styles.cardContainer}>
        <div className="tableWrapper">
          <PageHeader
            onBack={() => window.history.back()}
            title="User Management"
            ghost={false}
            extra={[
              <Button
                type="primary"
                icon={<UserAddOutlined />}
                onClick={() => handleAddOrEditUser(ADD_USER)}
              >
                Add User
              </Button>,
              <Button
                onClick={handelDataTableLoad}
                icon={listIsLoading ? <LoadingOutlined /> : <ReloadOutlined />}
              >
                Refresh
              </Button>,
            ]}
            style={{
              padding: "20px 0px",
            }}
          ></PageHeader>
          <Card>
            <SearchItem
              config={{
                entity: entity,
                searchConfig: {
                  displayLabels: ["name", "surname"],
                  searchFields: "email,name,surname",
                  outputValue: "_id",
                },
                onSelect: onSearchSelect,
              }}
            />
          </Card>
          <Table
            columns={columns}
            rowKey={(item) => item._id}
            dataSource={items}
            pagination={pagination}
            loading={listIsLoading}
            onChange={handelDataTableLoad}
          />
        </div>
      </Card>
      <AddOrEditUsers
        title={
          addEditModal?.type === ADD_USER ? "Add New User" : "Edit User Details"
        }
        entity={entity}
        type={addEditModal?.type}
        data={addEditModal?.data}
        visible={addEditModal?.isOpen}
        onCancel={() => setAddOrEditModal(initialState)}
        centered
        okText={addEditModal?.type === ADD_USER ? "Add User" : "Update User"}
      />
    </>
  );
};

export default UserManagement;
