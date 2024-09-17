import React, { useCallback, useEffect, useRef, useState } from "react";

import {
  AutoComplete,
  Button,
  Card,
  Empty,
  Input,
  Modal,
  PageHeader,
  Space,
  Table,
} from "antd";
import { useDispatch, useSelector } from "react-redux";
import {
  DeleteFilled,
  EditFilled,
  LoadingOutlined,
  ReloadOutlined,
  SearchOutlined,
  UserAddOutlined,
} from "@ant-design/icons";
import { selectAuth } from "@/redux/auth/selectors";
import Loading from "@/components/Loading";
import ImporterModalForm from "../OrderManager/components/ImporterDetails/components/ImporterForm/ImporterModalForm";

import {
  ADD_SURVEYOR,
  EDIT_SURVEYOR,
} from "../UserManagement/constants/userConstants";
import { fetchUserData, updateUser } from "@/redux/auth/actions";
import { countries } from "@/utils/countries";
import { isUndefined } from "lodash";

import styles from "./surveyorManagement.module.less";
import SurveyorModalForm from "../OrderManager/components/SurveyorDetails/components/SurveyorForm/SurveyorModalForm";

const initialState = {
  type: null,
  isOpen: false,
  data: null,
};

const initialDeleteState = {
  isModalOpen: false,
  selectedId: null,
  name: undefined,
};

const SurveyorManagement = () => {
  const dispatch = useDispatch();
  const surveyorFormRef = useRef(null);
  const { current: currentUser, userLoading } = useSelector(selectAuth);
  const [addEditModal, setAddOrEditModal] = useState(initialState);
  const [deleteModalConfig, setDeleteModalConfig] =
    useState(initialDeleteState);
  const [value, setValue] = useState("");
  const [options, setOptions] = useState();

  const surveyors = currentUser.surveyors ?? [];

  const onSearch = (searchText) => {
    const mappedOutput = surveyors
      ?.filter((item) =>
        item?.companyName?.toLowerCase()?.includes(searchText?.toLowerCase())
      )
      .map((item) => ({
        label: item?.companyName,
        value: item?.id,
      }));
    setOptions(mappedOutput);
  };

  const onSelect = (id) => {
    const findItem = surveyors?.find((item) => item.id === id);
    setValue(findItem?.companyName ?? "");
    handleAddOrEdit(EDIT_SURVEYOR, findItem);
  };

  const onChange = (data) => {
    const currentItem = options?.find((item) => {
      return item?.id === data;
    });
    setValue(currentItem?.label);
  };

  const handleAddOrEdit = (type, data) => {
    setAddOrEditModal({ type: type, isOpen: true, data: data || null });
  };

  const handleDelete = (data) => {
    setDeleteModalConfig({
      isModalOpen: true,
      selectedId: data?.id,
      name: data?.companyName,
    });
  };

  const columns = [
    {
      title: "Surveyor",
      dataIndex: "companyName",
      key: "companyName",
      sorter: (a, b) => a?.companyName - b?.companyName,
    },
    {
      title: "Contact Name",
      dataIndex: "contactName",
      key: "contactName",
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "Country",
      dataIndex: "country",
      key: "country",
      render: (_, data) => {
        const findCountry = countries.find(
          (item) => item.name.common === data?.country
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
      title: "Actions",

      key: "actions",
      render: (rowData) => (
        <Space align="end">
          <Button
            icon={<EditFilled />}
            onClick={() => handleAddOrEdit(EDIT_SURVEYOR, rowData)}
          >
            Edit
          </Button>
          <Button
            danger
            onClick={() => handleDelete(rowData)}
            icon={<DeleteFilled />}
          >
            Remove
          </Button>
        </Space>
      ),
    },
  ];

  const handelDataTableLoad = useCallback(() => {
    dispatch(fetchUserData(currentUser?.id));
  }, []);

  const handleSubmit = () => {
    surveyorFormRef?.current?.submitForm();
  };

  const onDelete = () => {
    if (userLoading) {
      return;
    }
    try {
      if (!!deleteModalConfig.isModalOpen) {
        const newFiltered = surveyors?.filter(
          (item) => item.id !== deleteModalConfig.selectedId
        );
        dispatch(
          updateUser(currentUser?.id, {
            surveyors: newFiltered,
          })
        );
      }
    } finally {
      setDeleteModalConfig(initialDeleteState);
    }
  };

  useEffect(() => {
    handelDataTableLoad();
  }, []);

  return (
    <>
      <Card className={styles.cardContainer}>
        <div className="tableWrapper">
          <PageHeader
            onBack={() => window.history.back()}
            title="Surveyor Management"
            ghost={false}
            extra={[
              <Button
                type="primary"
                icon={<UserAddOutlined />}
                onClick={() => handleAddOrEdit(ADD_SURVEYOR)}
              >
                Add Surveyor
              </Button>,
              <Button
                onClick={handelDataTableLoad}
                icon={userLoading ? <LoadingOutlined /> : <ReloadOutlined />}
              >
                Refresh
              </Button>,
            ]}
            style={{
              padding: "20px 0px",
            }}
          ></PageHeader>
          <Card>
            <AutoComplete
              value={value}
              options={options}
              style={{
                width: "100%",
              }}
              onSelect={onSelect}
              onSearch={onSearch}
              onChange={onChange}
              notFoundContent={<Empty />}
              allowClear={true}
              placeholder="Search Surveyors"
            >
              <Input suffix={<SearchOutlined />} clearableInput />
            </AutoComplete>
          </Card>
          <Table
            columns={columns}
            rowKey={(item) => item._id}
            dataSource={surveyors}
            loading={userLoading}
          />
        </div>
      </Card>
      <Modal
        title={addEditModal?.data ? "Edit Surveyor" : "Add Surveyor"}
        visible={addEditModal.isOpen}
        onOk={() => handleSubmit()}
        onCancel={() => setAddOrEditModal(initialState)}
        width={1000}
        destroyOnClose
        okText={addEditModal?.data ? "Edit Surveyor" : "Add Surveyor"}
      >
        <Loading isLoading={userLoading ?? false}>
          <SurveyorModalForm
            type={addEditModal?.type}
            data={addEditModal?.data ?? null}
            ref={surveyorFormRef}
            onChange={handelDataTableLoad}
            onClose={() => setAddOrEditModal(initialState)}
          />
        </Loading>
      </Modal>
      <Modal
        title={"Remove Surveyor"}
        visible={deleteModalConfig.isModalOpen}
        onOk={onDelete}
        okText="Remove Surveyor"
        onCancel={() => setDeleteModalConfig(initialDeleteState)}
        confirmLoading={userLoading}
        okButtonProps={{
          danger: true,
        }}
      >
        <Loading isLoading={userLoading ?? false}>
          <p>
            Are you sure you want to delete?
            <br />
            <b>{deleteModalConfig.name}</b>
          </p>
        </Loading>
      </Modal>
    </>
  );
};

export default SurveyorManagement;
