const fs = require("fs");
const express = require("express");

const app = express();
const PORT = 8000;

//midlleware untuk membaca json dari request body
app.use(express.json());

const customers = JSON.parse(fs.readFileSync(`${__dirname}/data/dummy.json`));

const defaultRouter = (req, res, next) => {
  res.send("<p>HEllow FSW 1</p>");
};

const getCustomersData = (req, res, next) => {
  res.status(200).json({ 
    status: "success",
    totalData: customers.length,
    data: {
      customers
    }
  });
};

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

//api untuk get by id
app.get("/api/v1/customers/:id", (req, res, next) => {
  console.log(req.params);
  console.log(req.params.id);

  // menggunakan array metode untuk membantuk menentukan spesifik data
  const customer = customers.find((cust) => cust._id === req.params.id);

  res.status(200).json({
    status: "success",
    data: {
      customers,
    },
  });
});

// api untuk update data
app.patch("/api/v1/customers/:id", (req, res) => {
  const id = req.params.id;

  // 1. melakukan pencarian data yang sesuai dengan paramater id nya
  const customer = customers.find((cust) => cust._id == id);
  const customerIndex = customers.findIndex((cust) => cust._id == id);

  // console.log(customer);
  // console.log(customerIndex);
  // console.log(!customer);

  // 2. ada ngga data customernya
  if (!customer) {
    return res.status(404).json({
      status: "fail",
      message: `customer dengan ID :${id} gak ada`,
    });
  }

  // 3. jika ada, update data sesuai req body dr client/user
  // object assign = menggabungkan objek OR spread operator
  customers[customerIndex] = { ...customers[customerIndex], ...req.body };

  // 4. melakukan update di dokumen jsonnya
  fs.writeFile(
    `${__dirname}/data/dummy.json`,
    JSON.stringify(customer),
    (err) => {
      res.status(200).json({
        status: "success",
        message: "berhasil update data",
        data: {
          customer: customer[customerIndex],
          customer,
        },
      });
    }
  );
});

// delete data
app.delete("/api/v1/customers/:id", (req, res) => {
  const id = req.params.id;

  // Lakukan pencarian data yang sesuai dengan parameter id nya
  const customerIndex = customers.findIndex((cust) => cust._id == id);

  // Periksa apakah data customer ditemukan
  if (customerIndex === -1) {
    return res.status(404).json({
      status: "fail",
      message: `Customer dengan ID : ${id} tidak ditemukan`,
    });
  }

  // Hapus customer dari array
  const deletedCustomer = customers.splice(customerIndex, 1)[0];

  fs.writeFile(
    `${__dirname}/data/dummy.json`,
    JSON.stringify(customers),
    (err) => {
      res.status(200).json({
        status: "success",
        message: "Berhasil menghapus data",
        data: {
          customer: deletedCustomer,
        },
      });
    }
  );
});

app.listen(PORT, () => {
  console.log(`APP runing on port : ${PORT}`);
});


// Routes
app.get("/", defaultRouter);
app.get("/api/v1/customers", getCustomersData);


// const id = req.params.id
// console.log(req.params.name);
// console.log(req.params.date);

//shortcut pemanggilan objek
// const {id, name, date } = req.params;
// console.log(id);
