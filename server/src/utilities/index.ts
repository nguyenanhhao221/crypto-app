import { TExchange } from '../type-backend';

export const getExchangeIds = (dataArr: TExchange[]): string[] => {
  return dataArr.map((exchange) => exchange.id);
};
