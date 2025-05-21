const express = require("express");
const { Musician } = require("../models");

const router = express.Router();

router.get("/", async (req, res, next) => {
    try {
        const musicians = await Musician.findAll();

        if (musicians) {
            res.status(200).json(musicians);
        } else {
            res.status(400).send(`Could not get musicians.`);
        }

    } catch (err) {
        next(err);
    }
})