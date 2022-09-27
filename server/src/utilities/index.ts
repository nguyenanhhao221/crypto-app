import { TExchange } from '../type-backend';

export const getExchangeIds = (
  dataArr: TExchange[] | undefined
): string[] | Error => {
  if (typeof dataArr === 'undefined') {
    return new Error('Data is undefined');
  }
  return dataArr.map((exchange) => exchange.id);
};
