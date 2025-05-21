const express = require("express");
const app = express();
const { Musician, Band } = require("../models/index")
const { db } = require("../db/connection")
const musiciansRouter = require("../routes/musicians");
const port = 3000;

app.use(express.json());
app.use(express.urlencoded());

app.use("/musicians", musiciansRouter);

app.get("/bands", async (req, res, next) => {
    try {
        const bands = await Band.findAll();

        if (bands) {
            res.status(200).json(bands);
        } else {
            res.status(400).send(`Could not find bands`);
        }
    } catch (err) {
        next(err);
    }

})

module.exports = app;