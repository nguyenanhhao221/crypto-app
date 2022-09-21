import express from 'express';
import axios, { AxiosRequestConfig, AxiosRequestHeaders } from 'axios';
import * as dotenv from 'dotenv';
dotenv.config();

const getCryptoRouter = express.Router();

//Make sure the API key in env is valid
const apiKey = process.env.X_RAPIDAPI_KEY;
if (!apiKey) {
  throw new Error('Invalid api key in env file');
}
const cryptoApiHeaders: AxiosRequestHeaders = {
  'X-RapidAPI-Key': process.env.X_RAPIDAPI_KEY as unknown as string,
  'X-RapidAPI-Host': 'coinranking1.p.rapidapi.com',
};

getCryptoRouter.get('/', async (req, res, next) => {
  const options: AxiosRequestConfig = {
    method: 'GET',
    url: 'https://coinranking1.p.rapidapi.com/coins',
    headers: cryptoApiHeaders,
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

export default getCryptoRouter;
