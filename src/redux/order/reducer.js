import * as actionTypes from "./types";

const INITIAL_STATE = {
  _id: undefined,
  status: "DRAFT",
  exporter: {
    companyName: "J.M. Grains PTY LTD",
    attendee: "Manjula Lanerolle",
    addressNo: "Unit 11 - 43",
    address: "Nicholson Street, Abbotsford, VIC 3067",
    country: "Australia",
    email: "info@imgrains.com",
    phoneNo: "0061416780374",
  },
  importer: {},
  finance: {},
  shipping: {},
  container: {},
  surveys: {},
  isLoading: false,
  orderList: [],
};

const orderReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case actionTypes.SET_ORDERS_LIST:
      return {
        ...state,
        orderList: action.payload,
      };
    case actionTypes.UPDATE_ORDER_IMPORTER:
      return {
        ...state,
        importer: action.payload,
      };

    case actionTypes.UPDATE_CURRENT_ORDER:
      return {
        ...state,
        status: action.payload.status ?? "DRAFT",
        _id: action.payload._id ?? null,
        container: action.payload.container ?? {},
        finance: action.payload.finance ?? {},
        shipping: action.payload.shipping ?? {},
        importer: action.payload.importer ?? {},
        exporter: action.payload.exporter ?? {},
        surveys: action.payload.surveys ?? {},
      };

    case actionTypes.RESET_CURRENT_ORDER:
      return {
        ...state,
        status: null,
        _id: undefined,
        container: {},
        finance: {},
        shipping: {},
        importer: {},
        exporter: {},
        surveys: {},
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

    case actionTypes.ADD_EXPORTER:
      return {
        ...state,
        exporter: action.payload,
      };
    case actionTypes.ADD_IMPORTER:
      return {
        ...state,
        importer: action.payload,
      };
    case actionTypes.ADD_SHIPPING:
      return {
        ...state,
        shipping: action.payload,
      };
    case actionTypes.ADD_SURVEY:
      return {
        ...state,
        surveys: action.payload,
      };
    case actionTypes.RESET_LOADING:
      return {
        ...state,
        isLoading: false,
      };
    case actionTypes.SET_LOADING:
      return {
        ...state,
        isLoading: true,
      };
    case actionTypes.CLEAR_STATE:
      return INITIAL_STATE;
    default:
      return state;
  }
};

export default orderReducer;
