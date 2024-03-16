const express = require("express");
const morgan = require("morgan");

const app = express();

const customerRoutes= require('./routes/customerRoutes');

// Middleware untuk membaca JSON dari request body
app.use(express.json());

// Middleware dari pihak ketiga (morgan) untuk logging
app.use(morgan('dev'));

// Middleware kita sendiri
app.use((req, res, next) => {
  console.log("hello fsw 1 ini middleware kita sendiri..");
  next();
});

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

app.use('/api/v1/customers', customerRoutes);

// Rute default
app.get('/', (req, res) => {
  res.send('Welcome to the main page!');
});

module.exports = app
