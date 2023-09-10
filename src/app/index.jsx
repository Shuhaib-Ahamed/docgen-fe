import React from "react";
import { Router as RouterHistory } from "react-router-dom";
import { Provider } from "react-redux";
import Router from "@/router";
import history from "@/utils/history";
import store from "@/redux/store";

import { Button, ConfigProvider, Result } from "antd";

import useNetwork from "@/hooks/useNetwork";

function App() {
  const { isOnline: isNetwork } = useNetwork();

  if (!isNetwork)
    return (
      <>
        <Result
          status="404"
          title="No Internet Connection"
          subTitle="Check your Internet Connection or your network."
          extra={
            <Button href="/" type="primary">
              Try Again
            </Button>
          }
        />
      </>
    );
  else {
    return (
      <ConfigProvider
        theme={{
          token: {
            fontFamily: "Roboto",
          },
        }}
      >
        <RouterHistory history={history}>
          <Provider store={store}>
            <Router />
          </Provider>
        </RouterHistory>
      </ConfigProvider>
    );
  }
}

export default App;
