import express from 'express';
import * as dotenv from 'dotenv';
import cors from 'cors';
import morgan from 'morgan';
import path from 'path';
import getCryptoRouter from './routes/getCryptoRouter';
import getCryptoNewsRouter from './routes/getCryptoNewsRouter';
import getCryptoExchangesRouter from './routes/getCryptoExchangesRouter';
dotenv.config();

const app = express();

app.use(cors());
app.use(morgan('dev'));

const PORT = 8000;

app.use('/', express.static(path.join(__dirname, '/build')));
app.use('/get-crypto', getCryptoRouter);
app.use('/get-crypto-news', getCryptoNewsRouter);
app.use('/exchanges', getCryptoExchangesRouter);

app.listen(PORT, () =>
  console.log(`[server] Server is listening on PORT: ${PORT}`)
);

module.exports = app;
