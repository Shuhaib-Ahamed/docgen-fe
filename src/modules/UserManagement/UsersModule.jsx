import React, { useCallback, useEffect } from "react";
import styles from "./userManagement.module.less";
import { Button, Card, PageHeader, Space, Table, Tag } from "antd";
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

const UserManagement = () => {
  const entity = "admin";
  const { result: listResult, isLoading: listIsLoading } =
    useSelector(selectListItems);

  const { pagination, items } = listResult;

  const dispatch = useDispatch();

  const handelDataTableLoad = useCallback((pagination) => {
    if (!listIsLoading) {
      dispatch(crud.list(entity, pagination.current));
    }
  }, []);

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
      render: (row) => (
        <Space align="end">
          <Button icon={<EditFilled />} onClick={handleEdit(row)}>
            Edit
          </Button>
          <Button danger onClick={handleDelete(row)} icon={<DeleteFilled />}>
            Remove
          </Button>
        </Space>
      ),
    },
  ];

  const handleEdit = (row) => {};

  const handleDelete = (row) => {};

  const handleAddUser = () => {};

  const onSearchSelect = (row) => {
    console.log(row);
  };

  useEffect(() => {
    dispatch(crud.list(entity));
  }, []);

  return (
    <div>
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
                onClick={handleAddUser}
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
          ,
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
    </div>
  );
};

export default UserManagement;
