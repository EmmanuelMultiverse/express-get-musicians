const express = require("express");
const { Band, Musician } = require("../models");
const router = express.Router();

router.get("/", async (req, res, next) => {
    try {
        const bands = await Band.findAll({
            include: Musician,

        });

        if (bands) {
            res.status(200).json(bands);
        } else {
            res.status(400).send(`Could not find bands`);
        }

    } catch (err) {
        next(err);
    }
})

router.get("/:id", async (req, res, next) => {
    try {

        const band = await Band.findByPk(req.params.id, 
            {
                include: Musician,

            }
        );

        if (band) {
            res.status(200).json(band);
        } else {
            res.status(400).send(`Could not find  ${req.params.id}`);
        }

    } catch (err) {
        next(err);
    }
})

module.exports = router;