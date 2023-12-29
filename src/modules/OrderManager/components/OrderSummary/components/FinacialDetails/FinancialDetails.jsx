import {
  Col,
  Divider,
  Form,
  Input,
  InputNumber,
  Modal,
  Row,
  Select,
} from "antd";
import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useState,
} from "react";
import { isEmpty } from "lodash";
import styles from "./financialDetails.module.less";
import TextArea from "antd/lib/input/TextArea";
import { useDispatch, useSelector } from "react-redux";
import { addFinanceDetails } from "@/redux/order/actions";
import { getOrder } from "@/redux/order/selectors";
import CustomSelect from "@/components/CustomSelect/CustomSelect";
import { SELECT_TYPE } from "@/modules/OrderManager/constants/common";
import { selectAuth } from "@/redux/auth/selectors";

const FinancialDetails = forwardRef((props, ref) => {
  const { current: currentUser } = useSelector(selectAuth);
  const { isLoading, finance } = useSelector(getOrder);

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const dispatch = useDispatch();
  const [form] = Form.useForm();

  useImperativeHandle(
    ref,
    () => {
      return {
        submitForm() {
          form?.submit();
        },
      };
    },
    []
  );

  const onFinish = (values) => {
    try {
      if (!isEmpty(values)) dispatch(addFinanceDetails(values));
    } catch (error) {
      console.log(error);
    }
  };

  const dispatchOnChange = (value) => {
    if (!isEmpty(value)) dispatch(addFinanceDetails({ ...finance, ...value }));
  };

  const handleTotalCount = () => {
    const qty = form.getFieldValue("quantity");
    const usdValue = form.getFieldValue("usdMT");

    if (qty && usdValue) {
      const total = (qty * usdValue).toFixed(2);
      form.setFieldValue("total", total);
      dispatch(
        addFinanceDetails({
          ...finance,
          quantity: qty,
          usdMT: usdValue,
          total: total,
        })
      );
    } else {
      form.setFieldValue("total", undefined);
    }
  };

  useEffect(() => {
    if (!isEmpty(finance)) {
      form.setFieldsValue({
        name: finance?.name,
        specification: finance?.specification,
        quantity: finance?.quantity,
        usdMT: finance?.usdMT,
        total: finance?.total,
        description: finance?.description,
        edn: finance?.edn,
        rfp: finance?.rfp,
        invoiceNo: finance?.invoiceNo,
        piNo: finance?.piNo,
        refNo: finance?.refNo,
        frieghtCost: finance?.frieghtCost,
        insuaranceCost: finance?.insuaranceCost,
        totalCost: finance?.totalCost,
        fclSize: finance?.fclSize,
        fclNo: finance?.fclNo,
      });
    }
  }, []);

  return (
    <>
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        disabled={isLoading}
        onValuesChange={dispatchOnChange}
      >
        <h1 className={styles.subHeading}>Order Details</h1>
        <Divider className={styles.divider} />
        <Row gutter={32}>
          <Col span={12}>
            <Form.Item
              label="Select Export Item"
              name="name"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <CustomSelect
                defaultValue={finance?.name}
                placeholder="Name of the Good"
                items={currentUser.goods ?? []}
                renderType={SELECT_TYPE.GOOD}
                onChange={(value) => {
                  dispatch(addFinanceDetails({ ...finance, name: value }));
                }}
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="Specification / Grade"
              name="specification"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <CustomSelect
                defaultValue={finance?.specification}
                placeholder="Name of the Good"
                items={currentUser.specifications ?? []}
                renderType={SELECT_TYPE.SPEC}
                onChange={(value) => {
                  dispatch(
                    addFinanceDetails({ ...finance, specification: value })
                  );
                }}
              />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={32}>
          <Col span={12}>
            <Form.Item
              label="FCL Size"
              name="fclSize"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Input autoComplete="off" />
            </Form.Item>
          </Col>{" "}
          <Col span={12}>
            <Form.Item
              label="Number of FCL"
              name="fclNo"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Input autoComplete="off" />
            </Form.Item>
          </Col>{" "}
        </Row>
        <Row gutter={32}>
          <Col span={8}>
            <Form.Item
              label="Quantity (MT)"
              name="quantity"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Input
                type="number"
                onChange={handleTotalCount}
                autoComplete="off"
              />
            </Form.Item>
          </Col>{" "}
          <Col span={8}>
            <Form.Item
              label="USD Per MT"
              name="usdMT"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <InputNumber
                className={styles.dateLable}
                formatter={(value) =>
                  `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                }
                parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
                onChange={handleTotalCount}
              />
            </Form.Item>
          </Col>{" "}
          <Col span={8}>
            <Form.Item
              label="Total Amount"
              name="total"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <InputNumber
                className={styles.dateLable}
                formatter={(value) =>
                  `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                }
                parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
              />
            </Form.Item>
          </Col>{" "}
        </Row>
        <Row gutter={32}>
          <Col span={24}>
            <Form.Item
              label="Description of the goods"
              name="description"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <TextArea autoComplete="off" />
            </Form.Item>
          </Col>{" "}
        </Row>{" "}
        <Row gutter={32}>
          <Col span={12}>
            <Form.Item label="EDN Number" name="edn">
              <Input autoComplete="off" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="RFP Number" name="rfp">
              <Input type="number" autoComplete="off" />
            </Form.Item>
          </Col>{" "}
        </Row>{" "}
        <Row gutter={32}>
          <Col span={8}>
            <Form.Item label="Invoice Number" name="invoiceNo">
              <Input autoComplete="off" />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item label="PI Number" name="piNo">
              <Input autoComplete="off" />
            </Form.Item>
          </Col>{" "}
          <Col span={8}>
            <Form.Item label="Reference Number" name="refNo">
              <Input autoComplete="off" />
            </Form.Item>
          </Col>{" "}
        </Row>{" "}
        <Row gutter={32}>
          <Col span={8}>
            <Form.Item label="Frieght Cost" name="frieghtCost">
              <InputNumber
                className={styles.dateLable}
                autoComplete="off"
                formatter={(value) =>
                  `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                }
                parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
              />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item label="Insuarance Cost" name="insuaranceCost">
              <InputNumber
                className={styles.dateLable}
                autoComplete="off"
                formatter={(value) =>
                  `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                }
                parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
              />
            </Form.Item>
          </Col>{" "}
          <Col span={8}>
            <Form.Item label="Total Cost" name="totalCost">
              <InputNumber
                autoComplete="off"
                className={styles.dateLable}
                formatter={(value) =>
                  `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                }
                parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
              />
            </Form.Item>
          </Col>{" "}
        </Row>{" "}
      </Form>
    </>
  );
});

export default FinancialDetails;
