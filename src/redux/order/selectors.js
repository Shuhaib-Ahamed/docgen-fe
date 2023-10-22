import { createSelector } from "reselect";
const orderSelect = (state) => state.order;

export const getOrder = createSelector([orderSelect], (order) => order);

export const getImporter = createSelector(
  [orderSelect],
  (order) => order.importer
);

export const getExporter = createSelector(
  [orderSelect],
  (order) => order.exporter
);

