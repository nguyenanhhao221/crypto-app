import express, { Request, Response } from 'express';
import axios, { AxiosRequestConfig, AxiosRequestHeaders } from 'axios';
import * as dotenv from 'dotenv';
import { apiKey } from '../routes/getCryptoRouter';
import { TExchange, TRequestAttachData, TVolumeChart } from '../type-backend';
import { getExchangeIds } from '../utilities';
dotenv.config();
/* 
* Feature: This Middleware will be called when front-end make request to '/get-exchanges'
Because the limit of Coingecko API, we will have to make 2 call to the APIs to get all the property and transform the data format to what the front end need
*/
//Make sure the API key in env is valid
if (typeof apiKey === 'undefined') {
  throw new Error('Invalid api key in env file');
}

const getCryptoExchangesRouter = express.Router();
//FIRST ping the server of CoinGecko
getCryptoExchangesRouter.get('/', async (req, res, next) => {
  try {
    const serverStatus = await axios.get(
      'https://api.coingecko.com/api/v3/ping'
    );
    if (serverStatus) {
      next();
    }
  } catch (error) {
    next(error); //TODO right error handler for express
  }
});

//Second, make request to CoinGecko to list all exchanges and info (minus the history volume)
//* Here we use TRequestAttachData for the type of Request declaration by Express because in order to attach other properties (in this case the .data) to the Request object of express we will have to extends the original request's type by express . See .types.d.ts for more info
getCryptoExchangesRouter.get(
  '/',
  async (req: TRequestAttachData, res, next) => {
    try {
      const options: AxiosRequestConfig = {
        params: {
          per_page: 5, //Only get the first 10 //TODO: Since Coingecko limit api call, find a way to implement for more than 10 call
        },
      };
      const response = await axios.get(
        'https://api.coingecko.com/api/v3/exchanges',
        options
      );
      if (response.status === 200) {
        //Attach data to next middleware
        req.data = response.data;
        if (typeof req.data !== 'undefined') {
          const exchangeIds = getExchangeIds(req.data);
          req.exchangeIds = exchangeIds; //Attach exchangeIds to next middleware
          next();
        }
      }
      //TODO handle error cases
    } catch (error) {
      next(error); //TODO right error handler for express
    }
  }
);

//Third, get the id from each of the exchange, with that id array make another call to get the volume history to display to the chart later
getCryptoExchangesRouter.get(
  '/',
  async (req: TRequestAttachData, res, next) => {
    const options: AxiosRequestConfig = {
      params: {
        days: 7, //!This is for number of days history of the price chart
      },
    };

    const promiseArr = req.exchangeIds?.map(async (eachId) => {
      const url = `https://api.coingecko.com/api/v3/exchanges/${eachId}/volume_chart`;
      try {
        const response = await axios.get(url, options);
        if (response.status === 200) {
          const volume_chart_7d: TVolumeChart = response.data;
          return {
            id: eachId,
            volume_chart_7d,
          };
        }
      } catch (error) {
        next(error);
      }
    });
    const result = await Promise.all(
      promiseArr as Promise<{ id: string; volume_chart_7d: TVolumeChart }>[]
    );
    const final = result.map((eachVolumeChart) => ({
      ...eachVolumeChart,
      ...req.data?.find((exchange) => exchange.id === eachVolumeChart.id),
    }));
    return res.status(200).json(final);
  }
);

export default getCryptoExchangesRouter;
