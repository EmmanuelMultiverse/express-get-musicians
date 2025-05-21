const { Musician, Band } = require("./models/index")
const { db } = require("./db/connection");
const { seedMusician, seedBand } = require("./seedData");

const syncSeed = async () => {
    await db.sync({force: true});
    await Musician.bulkCreate(seedMusician);
    await Band.bulkCreate(seedBand);

    const musicians = await Musician.findAll();
    let bands = await Band.findAll();

    // await bands[0].addMusician(musicians[0]);
    // await bands[0].addMusician(musicians[1]);

    bands = await Band.findAll({
        include: Musician,

    });
}

syncSeed();