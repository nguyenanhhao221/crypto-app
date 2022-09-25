import express from 'express';
import axios, { AxiosRequestConfig, AxiosRequestHeaders } from 'axios';
import * as dotenv from 'dotenv';
import { apiKey } from '../routes/getCryptoRouter';
dotenv.config();

//Make sure the API key in env is valid
if (typeof apiKey === 'undefined') {
  throw new Error('Invalid api key in env file');
}
const getCryptoExchangesRouter = express.Router();
getCryptoExchangesRouter.get('/', (req, res) => {
  res.status(200).json([
    {
      id: 'binance',
      name: 'Binance',
      year_established: 2017,
      country: 'Cayman Islands',
      description: '',
      url: 'https://www.binance.com/',
      image:
        'https://assets.coingecko.com/markets/images/52/small/binance.jpg?1519353250',
      has_trading_incentive: false,
      trust_score: 10,
      trust_score_rank: 1,
      trade_volume_24h_btc: 637574.9595674635,
      trade_volume_24h_btc_normalized: 637574.9595674635,
    },
    {
      id: 'okex',
      name: 'OKX',
      year_established: 2013,
      country: 'Belize',
      description: '',
      url: 'https://www.okx.com',
      image:
        'https://assets.coingecko.com/markets/images/96/small/WeChat_Image_20220117220452.png?1642428377',
      has_trading_incentive: false,
      trust_score: 10,
      trust_score_rank: 2,
      trade_volume_24h_btc: 69747.52386127997,
      trade_volume_24h_btc_normalized: 69747.52386127997,
    },
    {
      id: 'ftx_spot',
      name: 'FTX',
      year_established: 2019,
      country: 'Antigua and Barbuda',
      description: '',
      url: 'https://ftx.com/',
      image:
        'https://assets.coingecko.com/markets/images/451/small/F.png?1609051590',
      has_trading_incentive: false,
      trust_score: 10,
      trust_score_rank: 3,
      trade_volume_24h_btc: 45771.500720314725,
      trade_volume_24h_btc_normalized: 45771.500720314725,
    },
  ]);
});

export default getCryptoExchangesRouter;
