import React from "react";
import { DashboardLayout } from "@/layout";
import ImporterManagement from "@/modules/ImporterManagement/ImporterManagement";

const Importers = () => {
  return (
    <DashboardLayout>
      <ImporterManagement />
    </DashboardLayout>
  );
};

export default Importers;
