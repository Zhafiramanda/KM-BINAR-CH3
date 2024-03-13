const fs = require("fs");
const express = require("express");

const app = express();
const PORT = 8000;

//midlleware untuk membaca json dari request body
app.use(express.json());

const customers = JSON.parse(fs.readFileSync(`${__dirname}/data/dummy.json`));

// localhost:8000
app.get("/", (req, res, next) => {
  res.send("<p>Hallo FSW 1 TERCINTA</p>");
});

app.get("/api/v1/customers", (req, res, next) => {
  res.status(200).json({
    status: "success",
    totalData: customers.length,
    data: {
      customers: customers,
    },
  });
});

//create data
app.post("/api/v1/customers", (req, res) => {
  console.log(req.body);

  customers.push(req.body);
  fs.writeFile(
    `${__dirname}/data/dummy.json`,
    JSON.stringify(customers),
    (err) => {
      res.status(201).json({
        status: "success",
        data: {
          customers: newCustomer,
        },
      });
    }
  );

  res.send("oke udah");
});

app.listen(PORT, () => {
  console.log(`APP runing on port : ${PORT}`);
});
