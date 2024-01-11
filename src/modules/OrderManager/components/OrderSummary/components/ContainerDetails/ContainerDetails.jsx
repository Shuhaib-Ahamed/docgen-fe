import { Col, Divider, Form, Input, Row } from "antd";
import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useState,
} from "react";
import DatePicker from "react-date-picker";
import { getOrder } from "@/redux/order/selectors";
import { useDispatch, useSelector } from "react-redux";
import { isEmpty } from "lodash";
import { addContainerDetails } from "@/redux/order/actions";
import styles from "./containerDetails.module.less";

const ContainerDetails = forwardRef((props, ref) => {
  const { isLoading, container } = useSelector(getOrder);
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const [releaseDate, setReleaseDate] = useState();

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

  const onDateChange = (date) => {
    dispatch(addContainerDetails({ ...container, releaseDate: date }));
    setReleaseDate(date);
  };

  const onFinish = (values) => {
    const appendedValues = {
      releaseDate: releaseDate,
      ...values,
    };

    try {
      if (!isEmpty(appendedValues))
        dispatch(addContainerDetails(appendedValues));
    } catch (error) {
      console.log(error);
    }
  };

  const dispatchOnChange = (value) => {
    if (!isEmpty(value))
      dispatch(addContainerDetails({ ...container, ...value }));
  };

  useEffect(() => {
    if (!isEmpty(container)) {
      form.setFieldsValue({
        releaseNumber: container?.releaseNumber,
        releaseTo: container?.releaseTo,
        releaseFrom: container?.releaseFrom,
        releaseDate: container?.releaseDate,
      });

      setReleaseDate(new Date(container?.releaseDate));
    }
  }, []);

  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={onFinish}
      disabled={isLoading}
      onValuesChange={dispatchOnChange}
    >
      <h1 className={styles.subHeading}>Container Details</h1>
      <Divider className={styles.divider} />{" "}
      <Row gutter={32}>
        <Col span={12}>
          <Form.Item label="Container Release Number" name="releaseNumber">
            <Input autoComplete="off" />
          </Form.Item>
        </Col>{" "}
        <Col span={12}>
          <Form.Item label="Container Release Date" name="releaseDate">
            <DatePicker
              value={releaseDate}
              className={styles.dateLable}
              onChange={onDateChange}
            />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={32}>
        <Col span={12}>
          <Form.Item label="Releasing From" name="releaseFrom">
            <Input autoComplete="off" />
          </Form.Item>
        </Col>{" "}
        <Col span={12}>
          <Form.Item label="Releasing To" name="releaseTo">
            <Input autoComplete="off" />
          </Form.Item>
        </Col>
      </Row>
    </Form>
  );
});

export default ContainerDetails;
