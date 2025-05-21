const { Musician, Band } = require("./models/index")
const { db } = require("./db/connection");
const { seedMusician, seedBand } = require("./seedData");

const syncSeed = async () => {
    await db.sync({force: true});
    seedMusician.map(musician => Musician.create(musician));
    seedBand.map(band => Band.create(band));

    const musicians = await Musician.findAll();
    const bands = await Band.findAll();

    bands[0].addMusician(musicians[0]);
    bands[0].addMusician(musicians[1]);
}

syncSeed();