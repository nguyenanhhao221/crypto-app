"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getExchangeIds = void 0;
const getExchangeIds = (dataArr) => {
    return dataArr.map((exchange) => exchange.id);
};
exports.getExchangeIds = getExchangeIds;
