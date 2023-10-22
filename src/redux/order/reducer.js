import * as actionTypes from "./types";

const INITIAL_STATE = {
  currentId: null,
  exporter: {},
  importer: {},
  finance: {},
  shipping: {},
  container: {},
  isLoading: false,
};

const orderReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case actionTypes.CREATE_ORDER:
      return {
        ...state,
        exporter: action.payload.exporter,
        currentId: action.payload.id,
      };

    case actionTypes.UPDATE_ORDER_IMPORTER:
      return {
        ...state,
        importer: action.payload,
      };
    case actionTypes.UPDATE_ORDER:
      return {
        ...state,
        order: action.payload,
      };

    case actionTypes.ADD_CONTAINER:
      return {
        ...state,
        container: action.payload,
      };
    case actionTypes.ADD_FINANCE:
      return {
        ...state,
        finance: action.payload,
      };
    case actionTypes.ADD_SHIPPING:
      return {
        ...state,
        shipping: action.payload,
      };
    case actionTypes.RESET_LOADING:
      return {
        ...state,
        isLoading: false,
      };
    case actionTypes.SET_LOADING:
      return {
        ...state,
        isLoading: false,
      };
    case actionTypes.CLEAR_STATE:
      return INITIAL_STATE;
    default:
      return state;
  }
};

export default orderReducer;
