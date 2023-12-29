import React, { useEffect } from "react";

import AuthRouter from "./AuthRouter";
import AppRouter from "./AppRouter";

import { Layout } from "antd";
import Navigation from "@/layout/Navigation";

import { useDispatch, useSelector } from "react-redux";
import { selectAuth } from "@/redux/auth/selectors";
import { fetchUserData } from "@/redux/auth/actions";

export default function Router() {
  const { isLoggedIn, current } = useSelector(selectAuth);
  const dispatch = useDispatch();

  useEffect(() => {
    if (isLoggedIn) {
      dispatch(fetchUserData(current?.id));
    }
  }, []);

  if (isLoggedIn === false)
    return (
      <Layout style={{ minHeight: "100vh" }}>
        <AuthRouter />
      </Layout>
    );
  else {
    return (
      <Layout style={{ minHeight: "100vh" }}>
        <Navigation />
        <Layout style={{ minHeight: "100vh" }}>
          <AppRouter />
        </Layout>
      </Layout>
    );
  }
}
