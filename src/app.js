const express = require("express");
const app = express();
const { Musician, Band } = require("../models/index")
const { db } = require("../db/connection")

const port = 3000;

app.use(express.json());
app.use(express.urlencoded());

//TODO: Create a GET /musicians route to return all musicians 

app.get("/musicians", async (req, res) => {
    const musicians = await Musician.findAll();
    res.json(musicians);
})

app.get("/musicians/:id", async (req, res, next) => {
    try {
        const foundMusician = await Musician.findByPk(req.params.id);

        if (foundMusician) {
            res.status(200).json(foundMusician);
        } else {
            res.status(400).send("Could not find Musician");
        }
    } catch (err) {
        next(err);
    }
})

app.get("/musicians/1", async (req, res) => {
    const musicianOne = await Musician.findByPk(1);
    res.json(musicianOne);
})

app.get("/bands", async (req, res) => {
    const bands = await Band.findAll();
    res.json(bands);
})

app.post("/musicians", async (req, res, next) => {
    try {
        const musician = await Musician.create(req.body);

        if (musician) {
            res.status(200).json(musician);
        } else {
            res.status(400).send(`Could not create ${req.body}`);
        }
    } catch (err) {
        next(err);
    }
})

app.put("/musicians/:id", async (req, res, next) => {
    try {
        const foundMusician = await Musician.findByPk(req.params.id);

        if (foundMusician) {
            const updatedMusician = await foundMusician.update(req.body);
            res.status(200).json(updatedMusician);
        } else {
            res.status(400).send(`Could not find ${req.params.id}`);
        }
    } catch (err) {
        next(err);
    }
})

app.delete("/musicians/:id", async (req, res, next) => {
    try {  

        const foundMusician = await Musician.findByPk(req.params.id);

        if (foundMusician) {
            const deletedMusician = await foundMusician.destroy();
            res.status(200).json(deletedMusician);
        } else {
            res.status(400).send(`Could not find ${req.params.id}`);
        }

    } catch (err) {
        next(err);
    }
})











module.exports = app;