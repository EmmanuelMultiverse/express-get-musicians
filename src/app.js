const express = require("express");
const app = express();
const { Musician, Band } = require("../models/index")
const { db } = require("../db/connection")
const musiciansRouter = require("../routes/musicians");
const port = 3000;

app.use(express.json());
app.use(express.urlencoded());

app.use("/musicians", musiciansRouter);

module.exports = app;