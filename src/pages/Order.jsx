import React from "react";
import { DashboardLayout } from "@/layout";
import OrderManagement from "@/modules/OrderManager/OrderManagement";

const Orders = () => {
  return (
    <DashboardLayout>
      <OrderManagement />
    </DashboardLayout>
  );
};

export default Orders;
