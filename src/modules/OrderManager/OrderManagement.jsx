import React, { useState } from "react";
import { Button, Card, Drawer, PageHeader, Space } from "antd";

import { CloseOutlined, UserAddOutlined } from "@ant-design/icons";
import SearchItem from "@/components/SearchItem";
import styles from "./orderManagement.module.less";
import OrderBody from "./components/OrderComponent/OrderBody";
const OrderManagement = () => {
  const [open, setOpen] = useState(false);

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

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
              // <Button
              //   onClick={handelDataTableLoad}
              //   icon={listIsLoading ? <LoadingOutlined /> : <ReloadOutlined />}
              // >
              //   Refresh
              // </Button>,
            ]}
            style={{
              padding: "20px 0px",
            }}
          ></PageHeader>
          <Card>
            {/* <SearchItem
              config={{
                entity: entity,
                searchConfig: {
                  displayLabels: ["name"],
                  searchFields: "email,name",
                  outputValue: "_id",
                },
                onSelect: onSearchSelect,
              }}
            /> */}
          </Card>
          {/* <Table
            columns={columns}
            rowKey={(item) => item._id}
            dataSource={items}
            pagination={pagination}
            loading={listIsLoading}
            onChange={handelDataTableLoad}
          /> */}
        </div>
      </Card>{" "}
      <Drawer
        title="Create Order"
        width="100vw"
        visible={open}
        onClose={onClose}
        closeIcon={false}
        open={open}
        extra={<CloseOutlined onClick={() => onClose()} />}
      >
        <OrderBody onClose={onClose} />
      </Drawer>
    </>
  );
};

export default OrderManagement;
