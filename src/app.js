const express = require("express");
const app = express();
const { Musician, Band } = require("../models/index")
const { db } = require("../db/connection")
const musiciansRouter = require("../routes/musicians");
const bandsRouter = require("../routes/bands");
const port = 3000;

app.use(express.json());
app.use(express.urlencoded());

app.use("/musicians", musiciansRouter);
app.use("/bands", bandsRouter);

module.exports = app;