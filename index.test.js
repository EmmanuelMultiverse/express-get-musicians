const { execSync } = require('child_process');
execSync('npm install');
const { db } = require('./db/connection');
const { Musician } = require('./models/index')
const app = require('./src/app');
const {seedMusician} = require("./seedData");
const request = require("supertest");

const expectedMusician = {
    id: 1,
    name: "FR",
    instrument: "Guitar",
}

jest.mock("./models/Band", () => {
    return {
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
    }
    return { 
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
        const res = await request(app).post("/musicians");

        expect(res.statusCode).toBe(201);
        expect(res.body).toMatchObject(expectedMusician);
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
