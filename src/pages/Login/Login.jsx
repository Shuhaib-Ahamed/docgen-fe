import React from "react";
import { Form, Input, Button, Checkbox, Layout, Row, Col, Divider } from "antd";
import { login } from "@/redux/auth/actions";
import { useDispatch, useSelector } from "react-redux";
import { selectAuth } from "@/redux/auth/selectors";
import Loading from "@/components/Loading";
import LOGO from "@/assets/images/logo.svg";

import styles from "./login.module.less";

const LoginPage = () => {
  const { loading: isLoading } = useSelector(selectAuth);

  const dispatch = useDispatch();
  const onFinish = (values) => {
    dispatch(login(values));
  };

  return (
    <Layout className="layout">
      <Loading isLoading={isLoading}>
        <div className={styles.loginPage}>
          <div className={styles.loginBox}>
            <Form
              className={styles.loginForm}
              initialValues={{ remember: true }}
              onFinish={onFinish}
            >
              <div className={styles.logoContainer}>
                <img className={styles.logo} src={LOGO} alt="DocManager" />
                <span className={styles.logoHeading}>DocGen</span>
              </div>
              <Form.Item
                name="email"
                rules={[
                  { required: true, message: "Please input your username!" },
                ]}
              >
                <Input placeholder="Username" />
              </Form.Item>

              <Form.Item
                name="password"
                rules={[
                  { required: true, message: "Please input your password!" },
                ]}
              >
                <Input.Password placeholder="Password" />
              </Form.Item>

              <Form.Item name="remember" valuePropName="checked">
                <Checkbox>Remember me</Checkbox>
              </Form.Item>

              <Form.Item>
                <Button
                  disabled={isLoading}
                  loading={isLoading}
                  type="primary"
                  htmlType="submit"
                  className="login-form-button"
                >
                  LOGIN
                </Button>
              </Form.Item>
            </Form>
          </div>
        </div>
      </Loading>
    </Layout>
  );
};

export default LoginPage;
