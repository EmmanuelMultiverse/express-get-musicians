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

router.get("/:id", async (req, res, next) => {
    try {
        const musician = await Musician.findByPk(req.params.id);

        if (musician) {
            res.status(200).json(musician);
        } else {
            res.status(400).send(`Could not get musician ${req.params.id}.`);
        }

    } catch (err) {
        next(err);
    }
})

router.post("/", async (req, res, next) => {
    try {
        const musician = await Musician.create(req.body);

        if (musician) {
            res.status(201).json(musician);
        } else {
            res.status(400).send(`Could not create musician.`);
        }

    } catch (err) {
        next(err);
    }
})

router.put("/:id", async (req, res, next) => {
    try {
        const foundMusician = await Musician.findByPk(req.params.id);

        if (foundMusician) {
            const updatedMusician = await foundMusician.update(req.body);
            console.log(foundMusician);
            console.log(updatedMusician);
            res.status(201).json(foundMusician);
        } else {
            res.status(400).send(`Could not update musician.`);
        }

    } catch (err) {
        next(err);
    }
})

router.delete("/:id", async (req, res, next) => {
    try {
        const foundMusician = await Musician.findByPk(req.params.id);

        if (foundMusician) {
            const deletedMusician = await foundMusician.destroy();
            console.log(foundMusician);
            console.log(deletedMusician);
            res.status(201).json(foundMusician);
        } else {
            res.status(400).send(`Could not delete musician.`);
        }

    } catch (err) {
        next(err);
    }
})