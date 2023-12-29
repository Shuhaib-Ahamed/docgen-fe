import React, { useEffect, useCallback } from "react";
import { Button, Result } from "antd";
import { useDispatch } from "react-redux";
import { logout as logoutAction } from "@/redux/auth/actions";

const Logout = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    async function asyncLogout() {
      dispatch(logoutAction());
    }
    asyncLogout();
  }, []);

  return <></>;
};
export default Logout;
