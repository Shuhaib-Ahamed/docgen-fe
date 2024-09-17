import React from "react";
import { DashboardLayout } from "@/layout";
import ShipperManagement from "@/modules/ShipperManagement/ShipperManagement";

const Shippers = () => {
  return (
    <DashboardLayout>
      <ShipperManagement />
    </DashboardLayout>
  );
};

export default Shippers;
