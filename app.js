const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const helmet = require('helmet');
const { errors } = require('celebrate');
const errorHandler = require('./middlewares/error-handler');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const { PORT= 3005, MONGO_URL= 'mongodb://127.0.0.1:27017/bitfilmsdb' } = process.env;
const routes = require('./routes/index');

const app = express();
app.use(helmet());
app.use(express.json());
app.use(requestLogger);
app.use(routes);
async function connect() {
  await mongoose.connect(MONGO_URL);
  console.log(`Server connect db ${MONGO_URL}`);
  app.listen(PORT);
  console.log(`Server listen on ${PORT}`);
}
connect();
app.use(errorLogger);
app.use(errors());
app.use(errorHandler);
