import express from 'express';
import axios, { AxiosRequestConfig, AxiosRequestHeaders } from 'axios';
import * as dotenv from 'dotenv';
dotenv.config();

const getCryptoRouter = express.Router();

//Make sure the API key in env is valid
export const apiKey = process.env.X_RAPIDAPI_KEY;
if (typeof apiKey === 'undefined') {
  throw new Error('Invalid api key in env file');
}

//Coin ranking API to get Coin data
const coinRankingHeader: AxiosRequestHeaders = {
  'X-RapidAPI-Key': apiKey,
  'X-RapidAPI-Host': 'coinranking1.p.rapidapi.com',
};

getCryptoRouter.get('/', async (req, res, next) => {
  const options: AxiosRequestConfig = {
    method: 'GET',
    url: 'https://coinranking1.p.rapidapi.com/coins',
    headers: coinRankingHeader,
    params: req.query,
  };
  try {
    const response = await axios.request(options);
    res.send(response.data);
  } catch (error) {
    console.error(error);
    next(error);
  }
});
//Coin ranking API to get detail for a coin base on id
getCryptoRouter.get('/:coinId', async (req, res, next) => {
  const options: AxiosRequestConfig = {
    method: 'GET',
    url: `https://coinranking1.p.rapidapi.com/coin/${req.params.coinId}`,
    headers: coinRankingHeader,
  };
  try {
    const response = await axios.request(options);
    res.status(200).json(response.data);
  } catch (error) {
    console.error(error);
    next(error);
  }
});
//Coin ranking API to get coin history
getCryptoRouter.get('/:coinId/history', async (req, res, next) => {
  const options: AxiosRequestConfig = {
    method: 'GET',
    url: `https://coinranking1.p.rapidapi.com/coin/${req.params.coinId}/history`,
    headers: coinRankingHeader,
    params: req.query,
  };
  try {
    const response = await axios.request(options);
    res.status(200).json(response.data);
  } catch (error) {
    console.error(error);
    next(error);
  }
});
export default getCryptoRouter;
