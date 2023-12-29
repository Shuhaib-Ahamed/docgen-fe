import React from "react";
import { DashboardLayout } from "@/layout";
import SurveyorManagement from "@/modules/SurveyorManagement/SurveyorManagement";

const Surveyor = () => {
  return (
    <DashboardLayout>
      <SurveyorManagement />
    </DashboardLayout>
  );
};

export default Surveyor;
