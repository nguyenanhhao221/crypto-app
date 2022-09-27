import type { Request } from 'express';

//* Same in front end types.d.ts , remember to update correct types in both places if API changes
export type TExchange = {
  country: string;
  description: string;
  has_trading_incentive: boolean;
  id: string;
  image: string;
  name: string;
  trade_volume_24h_btc: number | string;
  trade_volume_24h_btc_normalized: number | string;
  trust_score: number;
  trust_score_rank: number;
  url: string;
  year_established: number;
  volume_chart_7d?: TVolumeChart;
};
export type TVolumeChart = [[number, string]];
interface TRequestAttachData extends Request {
  data?: TExchange[];
  exchangeIds?: string[];
}
