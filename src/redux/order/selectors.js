import { createSelector } from "reselect";
const orderSelect = (state) => state.order;

export const getOrder = createSelector([orderSelect], (order) => order);

export const getImporter = createSelector(
  [orderSelect],
  (order) => order.importer
);

export const getFinance = createSelector(
  [orderSelect],
  (order) => order.finance
);
export const getShipping = createSelector(
  [orderSelect],
  (order) => order.shipping
);

export const getContainer = createSelector(
  [orderSelect],
  (order) => order.container
);

export const getOrderList = createSelector(
  [orderSelect],
  (order) => order.orderList
);

export const getCurrentID = createSelector(
  [orderSelect],
  (order) => order.currentId
);

export const getExporter = createSelector(
  [orderSelect],
  (order) => order.exporter
);

export const isLoading = createSelector(
  [orderSelect],
  (order) => order.isLoading
);
