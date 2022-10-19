"use strict";
exports.__esModule = true;
exports.getExchangeIds = void 0;
var getExchangeIds = function (dataArr) {
    return dataArr.map(function (exchange) { return exchange.id; });
};
exports.getExchangeIds = getExchangeIds;
