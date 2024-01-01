import React, { useCallback, useEffect, useState } from "react";
import { Button, Card, Drawer, PageHeader, Space, Table, Tag } from "antd";
import DeleteModal from "@/components/DeleteModal";
import { countries } from "@/utils/countries";
import { isUndefined } from "lodash";
import {
  CloseOutlined,
  DeleteFilled,
  EditFilled,
  LoadingOutlined,
  ReloadOutlined,
  UserAddOutlined,
} from "@ant-design/icons";
import SearchItem from "@/components/SearchItem";
import { getOrder } from "@/redux/order/selectors";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchOrders,
  resetCurrentOrderData,
  setOrderData,
} from "@/redux/order/actions";
import { convertDate } from "@/utils/helpers";
import OrderBody from "./components/OrderComponent/OrderBody";

import styles from "./orderManagement.module.less";

const initialDeleteState = {
  isModalOpen: false,
  selectedId: null,
  name: undefined,
};

const OrderManagement = () => {
  const entity = "order";
  const { isLoading, orderList } = useSelector(getOrder);
  const [open, setOpen] = useState(false);
  const [deleteModalConfig, setDeleteModalConfig] =
    useState(initialDeleteState);
  const [current, setCurrent] = useState(0);
  const dispatch = useDispatch();
  const { pagination, items } = orderList;

  const onSearchSelect = (id) => {
    dispatch(resetCurrentOrderData());
    const rowData = items?.find((item) => item._id === id);
    handleEdit(rowData);
  };

  const handelDataTableLoad = useCallback((pagination) => {
    if (!isLoading) {
      dispatch(fetchOrders(pagination?.current ?? 1));
    }
  }, []);

  const showDrawer = () => {
    dispatch(resetCurrentOrderData());
    setCurrent(0);
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
    setCurrent(0);
    dispatch(resetCurrentOrderData());
  };

  const handleEdit = (data) => {
    showDrawer();
    dispatch(setOrderData(data));
  };

  const onCancelDelete = () => {
    setDeleteModalConfig(initialDeleteState);
  };

  const handleDelete = (data) => {
    setDeleteModalConfig({
      isModalOpen: true,
      selectedId: data?._id,
      name: data?.importer?.companyName,
    });
  };

  const columns = [
    {
      title: "Importer Name",
      dataIndex: "importer",
      key: "importer",
      sorter: (a, b) => a.importer?.companyName - b.importer?.companyName,
      render: (_, data) => data?.importer?.companyName ?? "-",
    },
    {
      title: "Imported To",
      dataIndex: "importer",
      key: "importer",
      render: (_, data) => {
        const findCountry = countries?.find(
          (item) => item.name.common === data?.importer?.country
        );

        if (isUndefined(findCountry)) {
          return <>-</>;
        }
        return (
          <div className={styles.optionTag}>
            <img className={styles.optionFlag} src={findCountry?.flags?.svg} />
            {findCountry?.name?.common}
          </div>
        );
      },
    },
    {
      title: "Shipping Company Name",
      dataIndex: "shipping",
      key: "shipping",
      sorter: (a, b) =>
        a.shipping?.shippingCompany - b.shipping?.shippingCompany,
      render: (_, data) => data?.shipping?.shippingCompany ?? "-",
    },
    {
      title: "Created On",
      dataIndex: "createdAt",
      key: "createdAt",
      sorter: (a, b) =>
        new Date(a?.createdAt).getDate() - new Date(b?.createdAt).getDate(),
      render: (_, data) => convertDate(data?.createdAt),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      sorter: (a, b) => a?.status - b?.status,
      render: (_, data) => (
        <Tag color={data.status === "DRAFT" ? "#108ee9" : "#87d068"}>
          {data.status}
        </Tag>
      ),
    },
    {
      title: "Actions",
      key: "actions",
      render: (rowData) => (
        <Space align="end">
          <Button onClick={() => handleEdit(rowData)} icon={<EditFilled />}>
            Edit
          </Button>
          <Button
            onClick={() => handleDelete(rowData)}
            danger
            icon={<DeleteFilled />}
          >
            Remove
          </Button>
        </Space>
      ),
    },
  ];

  useEffect(() => {
    dispatch(fetchOrders(1));
  }, []);

  return (
    <>
      <Card className={styles.cardContainer}>
        <div className="tableWrapper">
          <PageHeader
            onBack={() => window.history.back()}
            title="Order Management"
            ghost={false}
            extra={[
              <Button
                onClick={() => showDrawer()}
                type="primary"
                icon={<UserAddOutlined />}
              >
                Create Order
              </Button>,
              <Button
                onClick={() => handelDataTableLoad()}
                icon={isLoading ? <LoadingOutlined /> : <ReloadOutlined />}
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
                  displayLabels: ["importer", "shipping"],
                  secondaryDisplayLables: ["companyName", "shippingCompany"],
                  searchFields:
                    "importer.companyName,importer.country,shipping.shippingCompany",
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
            loading={isLoading}
            onChange={handelDataTableLoad}
          />
        </div>
      </Card>
      <Drawer
        title="Create Order"
        width="100vw"
        visible={open}
        onClose={onClose}
        closeIcon={false}
        open={open}
        extra={<CloseOutlined onClick={() => onClose()} />}
      >
        <OrderBody
          onClose={onClose}
          current={current}
          setCurrent={setCurrent}
        />
      </Drawer>
      <DeleteModal
        entity={entity}
        modalTitle="Delete Documents"
        isModalOpen={deleteModalConfig?.isModalOpen}
        displayItem={deleteModalConfig?.name}
        id={deleteModalConfig?.selectedId}
        handleCancel={onCancelDelete}
        deleteMessage="Are you sure you want to delete documents on the importer : "
        isOrder={true}
      />
    </>
  );
};

export default OrderManagement;
