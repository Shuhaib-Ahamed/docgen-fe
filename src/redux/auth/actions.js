import * as actionTypes from "./types";
import * as authService from "@/auth";
import storePersist from "@/redux/storePersist";
import history from "@/utils/history";

export const login = (loginAdminData) => async (dispatch) => {
  dispatch({
    type: actionTypes.LOADING_REQUEST,
    payload: { loading: true },
  });
  const data = await authService.login(loginAdminData);

  if (data.success === true) {
    const authValue = {
      current: data.result.admin,
      loading: false,
      isLoggedIn: true,
    };
    storePersist.set("auth", authValue);
    dispatch({
      type: actionTypes.LOGIN_SUCCESS,
      payload: data.result.admin,
    });
    history.push("/");
  } else {
    dispatch({
      type: actionTypes.FAILED_REQUEST,
      payload: data,
    });
  }
};

export const updateUser = (id, data) => async (dispatch) => {
  dispatch({
    type: actionTypes.AUTH_UPDATE_LOADING,
    payload: true,
  });
  const response = await authService.updateUser(id, data);
  if (response.success === true) {
    dispatch({
      type: actionTypes.LOGIN_SUCCESS,
      payload: response.result,
    });
  } else {
    dispatch({
      type: actionTypes.AUTH_UPDATE_LOADING,
      payload: false,
    });
  }
};

export const fetchUserData = (id) => async (dispatch) => {
  dispatch({
    type: actionTypes.AUTH_UPDATE_LOADING,
    payload: true,
  });
  const response = await authService.fetchUser(id);
  if (response.success === true) {
    dispatch({
      type: actionTypes.UPDATE_USER,
      payload: response.result,
    });
  } else {
    dispatch({
      type: actionTypes.AUTH_UPDATE_LOADING,
      payload: false,
    });
  }
};

export const logout = () => async (dispatch) => {
  authService.logout();
  dispatch({
    type: actionTypes.LOGOUT_SUCCESS,
  });
  history.push("/login");
};
