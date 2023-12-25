import React from "react";
import { Dropdown, Menu, Table } from "antd";

import { request } from "@/request";
import useFetch from "@/hooks/useFetch";

export default function RecentTable({ ...props }) {
  let { entity, dataTableColumns } = props;
  dataTableColumns = [...dataTableColumns];

  const asyncList = () => {
    return request.list(entity);
  };
  const { result, isLoading, isSuccess } = useFetch(asyncList);
  const firstFiveItems = () => {
    if (isSuccess && result) return result.slice(0, 5);
    return [];
  };
  return (
    <>
      <Table
        columns={dataTableColumns}
        rowKey={(item) => item._id}
        dataSource={isSuccess && firstFiveItems()}
        pagination={false}
        loading={isLoading}
      />
    </>
  );
}
