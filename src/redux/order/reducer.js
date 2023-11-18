import * as actionTypes from "./types";

const INITIAL_STATE = {
  currentId: null,
  exporter: {
    companyName: "J.M. Grains PTY LTD",
    attendee: "Manjula Lanerolle",
    addressNo: "Unit 11 - 43",
    address: "Nicholson Street, Abbotsford, VIC 3067",
    country: "Australia",
    email: "info@imgrains.com",
    phoneNo: "0061416780374",
  },
  importer: {
    companyName: "J.M. Grains PTY LTD",
    addressNo: "Unit 11 - 43",
    address: "Nicholson Street, Abbotsford, VIC 3067",
    country: "Sri Lanka",
  },
  finance: {
    name: "ewqeqwewq",
    specification: "ewqewqewq",
    quantity: "321",
    usdMT: 321,
    total: "103041.00",
    description: "dsadsadas",
    edn: "2312",
    rfp: "213",
  },
  shipping: {
    departureDate: "2023-11-15T08:39:03.283Z",
    portLoadCountry: "Sri Lanka",
    portDischargeCountry: "Australia",
    shippingCompany: "ewqewq",
    shippingContactName: "ewqewq",
    shippingContactNo: "213213",
    vesselName: "wewqe",
    voyageNo: "321321",
    transshipment: "wqewqe",
    portLoadName: "ewqewqew",
    portDischarge: "ewqewqweq",
    bookingRef: "ewq213213",
    salesContractNumber: "edqwewq",
  },
  container: {
    releaseDate: "2023-11-21T08:39:13.186Z",
    releaseNumber: "321312",
    releaseFrom: "12321",
    releaseTo: "132213",
    fclSize: "21",
    fclNo: "23",
  },

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
