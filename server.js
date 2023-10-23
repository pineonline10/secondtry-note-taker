// DEPENDENCIES
const express = require("express");
const path = require("path");
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');
const apiRoutes= require('./routes/apiRoutes')
require('express-async-errors');
require('dotenv').config();

//DATA

//APP/PORT
const app = express();
const PORT = process.env.PORT || 4000;

//MIDDLEWARE
app.use(express.json());
app.use(express.urlencoded({ extended: true })); 
app.use(express.static("public"));

//ROUTES

//homepage
app.get("/", (req, res) => res.sendFile(path.join(__dirname, './public/index.html')));

//notes page
app.get('/notes', (req, res) =>
  res.sendFile(path.join(__dirname, './public/notes.html'))
);

app.use("/api", apiRoutes);

// wildcard 404 route
app.get("*", (req, res) =>
res.sendFile(path.join(__dirname, './public/index.html'))
);

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
  });
  

// START THE SERVER
app.listen(PORT, () =>
  console.log(`Example app listening at http://localhost:${PORT}`)
);
