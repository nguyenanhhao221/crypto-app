import express from 'express';
import axios, { AxiosRequestConfig, AxiosRequestHeaders } from 'axios';
import * as dotenv from 'dotenv';
import { apiKey } from '../routes/getCryptoRouter';
dotenv.config();

if (typeof apiKey === 'undefined') {
  throw new Error('Invalid api key in env file');
}

const cryptoNewsHeaders: AxiosRequestHeaders = {
  'X-BingApis-SDK': 'true',
  'X-RapidAPI-Key': apiKey,
  'X-RapidAPI-Host': 'bing-news-search1.p.rapidapi.com',
};

const getCryptoNewsRouter = express.Router();
getCryptoNewsRouter.get('/', async (req, res, next) => {
  const options: AxiosRequestConfig = {
    method: 'GET',
    url: 'https://bing-news-search1.p.rapidapi.com/news/search',
    headers: cryptoNewsHeaders,
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
export default getCryptoNewsRouter;
