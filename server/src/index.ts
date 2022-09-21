import express from 'express';
import * as dotenv from 'dotenv';
import cors from 'cors';
import getCryptoRouter from './routes/getCryptoRouter';
dotenv.config();

const app = express();

app.use(cors());

const PORT = 8000;

app.listen(PORT, () =>
  console.log(`[server] Server is listening on PORT: ${PORT}`)
);
app.use('/get-crypto', getCryptoRouter);
