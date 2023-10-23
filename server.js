// DEPENDENCIES
const express = require("express");
const path = require("path");
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');
const apiRoutes= require('./routes/apiRoutes')
require('express-async-errors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 4000;

app.use(express.json());
app.use(express.urlencoded({ extended: true })); 
app.use(express.static("public"));

app.get("/", (req, res) => res.sendFile(path.join(__dirname, './public/index.html')));

app.get('/notes', (req, res) =>
  res.sendFile(path.join(__dirname, './public/notes.html'))
);

app.use("/api", apiRoutes);

app.get("*", (req, res) =>
res.sendFile(path.join(__dirname, './public/index.html'))
);

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
  });

app.listen(PORT, () =>
  console.log(`Example app listening at http://localhost:${PORT}`)
);
