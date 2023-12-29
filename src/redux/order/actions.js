import { request } from "@/request";
import * as actionTypes from "./types";

export const createOrder = (orderData) => async (dispatch) => {
  dispatch({
    type: actionTypes.SET_LOADING,
  });

  try {
    let data = await request.create("order", orderData);
    if (data.success === true) {
      let data = await request.list("order", { page: 1 });

      if (data.success === true) {
        const result = {
          items: data.result,
          pagination: {
            current: parseInt(data.pagination.page, 10),
            pageSize: 10,
            total: parseInt(data.pagination.count, 10),
          },
        };
        dispatch({
          type: actionTypes.SET_ORDERS_LIST,
          payload: result,
        });
      }
    }
  } catch (error) {
    console.log(error);
  } finally {
    dispatch({
      type: actionTypes.RESET_LOADING,
    });
  }
};

export const updateOrder = (orderData) => async (dispatch) => {
  dispatch({
    type: actionTypes.SET_LOADING,
  });

  const orderDataModified = {
    status: orderData.status,
    importer: orderData.importer,
    exporter: orderData.exporter,
    container: orderData.container,
    shipping: orderData.shipping,
    finance: orderData.finance,
    surveys: orderData.surveys,
  };

  try {
    let data = await request.update("order", orderData._id, orderDataModified);
    if (data.success === true) {
      let data = await request.list("order", { page: 1 });

      if (data.success === true) {
        const result = {
          items: data.result,
          pagination: {
            current: parseInt(data.pagination.page, 10),
            pageSize: 10,
            total: parseInt(data.pagination.count, 10),
          },
        };
        dispatch({
          type: actionTypes.SET_ORDERS_LIST,
          payload: result,
        });
      }
    }
  } catch (error) {
    console.log(error);
  } finally {
    dispatch({
      type: actionTypes.RESET_LOADING,
    });
  }
};

export const deleteOrder = (orderId) => async (dispatch) => {
  dispatch({
    type: actionTypes.SET_LOADING,
  });

  try {
    let data = await request.delete("order", orderId);

    if (data.success === true) {
      let data = await request.list("order", { page: 1 });

      if (data.success === true) {
        const result = {
          items: data.result,
          pagination: {
            current: parseInt(data.pagination.page, 10),
            pageSize: 10,
            total: parseInt(data.pagination.count, 10),
          },
        };
        dispatch({
          type: actionTypes.SET_ORDERS_LIST,
          payload: result,
        });
      }
    }
  } catch (error) {
    console.log(error);
  } finally {
    dispatch({
      type: actionTypes.RESET_LOADING,
    });
  }
};

export const fetchOrders = (currentPage) => async (dispatch) => {
  dispatch({
    type: actionTypes.SET_LOADING,
  });

  try {
    let data = await request.list("order", { page: currentPage });

    if (data.success === true) {
      const result = {
        items: data.result,
        pagination: {
          current: parseInt(data.pagination.page, 10),
          pageSize: 10,
          total: parseInt(data.pagination.count, 10),
        },
      };
      dispatch({
        type: actionTypes.SET_ORDERS_LIST,
        payload: result,
      });
    }
  } catch (error) {
    console.log(error);
  } finally {
    dispatch({
      type: actionTypes.RESET_LOADING,
    });
  }
};

export const updateOrderImporter = (importerData) => async (dispatch) => {
  dispatch({
    type: actionTypes.SET_LOADING,
  });

  try {
    dispatch({
      type: actionTypes.UPDATE_ORDER_IMPORTER,
      payload: importerData,
    });
  } catch (error) {
  } finally {
    dispatch({
      type: actionTypes.RESET_LOADING,
    });
  }
};

export const addSurveyDetails = (survey) => async (dispatch) => {
  dispatch({
    type: actionTypes.ADD_SURVEY,
    payload: survey,
  });
};

export const addFinanceDetails = (finance) => async (dispatch) => {
  dispatch({
    type: actionTypes.ADD_FINANCE,
    payload: finance,
  });
};

export const addShippmentDetails = (shippment) => async (dispatch) => {
  dispatch({
    type: actionTypes.ADD_SHIPPING,
    payload: shippment,
  });
};

export const addContainerDetails = (container) => async (dispatch) => {
  dispatch({
    type: actionTypes.ADD_CONTAINER,
    payload: container,
  });
};

export const setOrderData = (orderData) => async (dispatch) => {
  dispatch({
    type: actionTypes.UPDATE_CURRENT_ORDER,
    payload: orderData,
  });
};

export const resetCurrentOrderData = () => async (dispatch) => {
  dispatch({
    type: actionTypes.RESET_CURRENT_ORDER,
  });
};
