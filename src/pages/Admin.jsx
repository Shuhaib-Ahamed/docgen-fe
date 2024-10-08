import React from "react";
import { DashboardLayout } from "@/layout";
import UserManagement from "@/modules/UserManagement/UserManagement";

export default function Admin() {
  return (
    <DashboardLayout>
      <UserManagement />
    </DashboardLayout>
  );
}
