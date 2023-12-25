import React, { useEffect, useState } from "react";
import { Modal } from "antd";

import { useDispatch, useSelector } from "react-redux";
import { crud } from "@/redux/crud/actions";
import { selectDeletedItem } from "@/redux/crud/selectors";
import Loading from "../Loading";
import { fetchOrders } from "@/redux/order/actions";

export default function DeleteModal(props) {
  let {
    entity,
    deleteMessage = "Are you sure you want to delete?",
    modalTitle = "Delete Entity",
    isModalOpen,
    displayItem,
    handleCancel,
    id,
    isOrder,
  } = props;

  const dispatch = useDispatch();
  const { isLoading, isSuccess } = useSelector(selectDeletedItem);

  useEffect(() => {
    if (isOrder) {
      if (isSuccess) {
        dispatch(fetchOrders(1));
        handleCancel();
      }
    } else {
      if (isSuccess) {
        dispatch(crud.list(entity));
        dispatch(crud.resetAction(entity));
        handleCancel();
      }
    }
  }, [isSuccess]);

  const handleOk = () => {
    dispatch(crud.delete(entity, id));
  };

  return (
    <Modal
      title={modalTitle}
      visible={isModalOpen}
      onOk={handleOk}
      okText="Remove Entity"
      onCancel={handleCancel}
      confirmLoading={isLoading}
      okButtonProps={{
        danger: true,
      }}
    >
      <Loading isLoading={isLoading}>
        <p>
          {deleteMessage}
          {displayItem}
        </p>
      </Loading>
    </Modal>
  );
}
