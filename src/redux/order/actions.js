import * as actionTypes from "./types";

export const createOrder = (exporterData) => async (dispatch) => {
  dispatch({
    type: actionTypes.SET_LOADING,
  });

  try {
    dispatch({
      type: actionTypes.CREATE_ORDER,
      payload: { exporter: exporterData, id: exporterData?.id },
    });
  } catch (error) {
  } finally {
    dispatch({
      type: actionTypes.RESET_LOADING,
    });
  }
};

export const updateExporter = (exportData) => async (dispatch) => {
  dispatch({
    type: actionTypes.SET_LOADING,
  });

  try {
    dispatch({
      type: actionTypes.UPDATE_ORDER_EXPORTER,
      payload: exportData,
    });
  } catch (error) {
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

export const updateOrder = (orderData) => async (dispatch) => {
  dispatch({
    type: actionTypes.SET_LOADING,
  });
  try {
    dispatch({
      type: actionTypes.UPDATE_ORDER,
      payload: orderData,
    });
  } catch (error) {
  } finally {
    dispatch({
      type: actionTypes.RESET_LOADING,
    });
  }
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
