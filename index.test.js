const { execSync } = require('child_process');
execSync('npm install');
const { db } = require('./db/connection');
const { Musician } = require('./models/index')
const app = require('./src/app');
const {seedMusician} = require("./seedData");
const request = require("supertest");
const { BelongsTo, HasMany } = require('sequelize');

const expectedMusician = {
    id: 1,
    name: "FR",
    instrument: "Guitar",
}

jest.mock("./models/Band", () => {
    const mockedBandInstance = { 
        id: 1,
        name: "PP",
        genre: "Mexico Regional",
        addMusician: jest.fn().mockResolvedValue(true),
        getMusicians: jest.fn().mockResolvedValue([
            {
                id: 1,
                name: "FR",
                instrument: "Guitar",
            },
            {
                id: 1,
                name: "FR",
                instrument: "Guitar",
            }
        ])
    }
    return {
        hasMany: jest.fn().mockResolvedValue(true),
        create: jest.fn().mockResolvedValue(mockedBandInstance),
        findAll: jest.fn().mockResolvedValue(
            [
                {
                    name: 'The Beatles',
                    genre: 'Rock',
                    musicians: [
                        {
                            id: 2,
                            name: "Drake",
                            instrument: "Voice",
                            bandId: 1,            
                        },                 
                        {
                            id: 1,
                            name: "Mick Jagger",
                            instrument: "Voice",
                            bandId: 1,
                        },
                    ]
                },
                {
                    name: 'Black Pink',
                    genre: 'Pop',
                },
                {
                    name: 'Coldplay',
                    genre: 'Rock'
                }
            ]
        ),

    }
})

jest.mock("./models/Musician", () => {
    let mockMusician = {
        id: 1,
        name: "FR",
        instrument: "Guitar",
        bandId: null,
        setBand: jest.fn().mockImplementation(function(bandInstance) {
            this.bandId = bandInstance.id;
            return Promise.resolve(this);
        })
    }
    return { 
        belongsTo: jest.fn().mockResolvedValue(true),
        create: jest.fn().mockResolvedValue(mockMusician),
        findByPk: jest.fn().mockResolvedValue({...mockMusician, 
            destroy: jest.fn().mockResolvedValue(mockMusician),
            update: jest.fn().mockResolvedValue(mockMusician),
        }),
        findAll: jest.fn().mockResolvedValue(
            [
                {
                name: 'Mick Jagger',
                instrument: 'Voice'
                },
                {
                name: 'Drake',
                instrument: 'Voice',
                },
                {
                name: 'Jimi Hendrix',
                instrument: 'Guitar'
                }
            ]
        ),
    }
})


describe('./musicians endpoint', () => {
    test("Verify GET /musicians", async () => {
        const response = await request(app).get("/musicians");
    
        expect(response.statusCode).toBe(200);
        expect(response.body).toMatchObject([
            {
            name: 'Mick Jagger',
            instrument: 'Voice'
            },
            {
            name: 'Drake',
            instrument: 'Voice',
            },
            {
            name: 'Jimi Hendrix',
            instrument: 'Guitar'
            }
        ])
    })
    
    test("Verify GET /musicians/:id", async () => {
        const res = await request(app).get("/musicians/1");
        const resJson = res.body;
        
        expect(res.statusCode).toBe(200);
        expect(resJson).toMatchObject(expectedMusician);
    })

    test("Verify POST /musicians", async () => {
        const goodRequest = {
            name: "FR",
            instrument: "Guitar",

        }

        const res = await request(app).post("/musicians").send(goodRequest);
        expect(res.statusCode).toBe(201);
        expect(res.body).toMatchObject(expectedMusician);
    })

    test("Verify POST /musicians returns error object with bad request - no name field", async () => {

        const badRequestNoName = {
            instrument: "Guitar",

        }

        const res = await request(app).post("/musicians").send(badRequestNoName);

        expect(res.statusCode).toBe(400);
        expect(res.body).toMatchObject({"error": [
            {
               location: "body",
               msg: "Invalid value",
               path: "name",
               type: "field",
           }
        ]
    });
})    
    test("Verify PUT /musicians/:id", async () => {
        
        const res = await request(app).put("/musicians/3");

        expect(res.statusCode).toBe(200);
        expect(res.body).toMatchObject(expectedMusician);
    })

    test("Verify Delete /musicians/:id", async () => {
 
        const res = await request(app).delete("/musicians/1");

        expect(res.statusCode).toBe(200);
        expect(res.body).toMatchObject(expectedMusician);
    })
})

describe("/bands endpoint", () => {
    test("Verify GET /bands", async () => {
        const res = await request(app).get("/bands");
        
        expect(res.statusCode).toBe(200);
        expect(res.body).toMatchObject([
            {
                name: 'The Beatles',
                genre: 'Rock',
                musicians: [
                    {
                        id: 2,
                        name: "Drake",
                        instrument: "Voice",
                        bandId: 1,
                        
                    },                 
                    {
                        id: 1,
                        name: "Mick Jagger",
                        instrument: "Voice",
                        bandId: 1,

                    },
                ]
            },
            {
                name: 'Black Pink',
                genre: 'Pop',
            },
            {
                name: 'Coldplay',
                genre: 'Rock'
            }
        ])
    })
})
