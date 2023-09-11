import express, { Express } from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import config from './config';
const app: Express = express();

import setupPassport from './utils/auth';
import setupV1Routes from './routes/V1';

import notFoundHandler from './middlewares/notFound.handler';
import { errorHandler, logErrors, boomErrorHandler } from './middlewares/error.handlers';

app.use(
  cors({
    origin: config.clientHost,
    credentials: true,
  }),
);
app.use(express.json());

setupPassport();
app.use(cookieParser());

//

app.get('/health', (req, res) => {
  res.json({
    message: 'active',
  });
});

setupV1Routes(app);

app.use(notFoundHandler)

app.use(logErrors);
app.use(boomErrorHandler);
app.use(errorHandler);

export default app;
