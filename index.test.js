const { execSync } = require('child_process');
execSync('npm install');
execSync('npm run seed');
const { db } = require('./db/connection');
const { Musician } = require('./models/index')
const app = require('./src/app');
const {seedMusician} = require("./seedData");
const request = require("supertest");


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
        expect(resJson).toMatchObject({
            name: 'Mick Jagger',
            instrument: 'Voice'
        })
    })

    test("Verify POST /musicians", async () => {
        const musician = {
            name: "FR",
            instrument: "Voice",

        }
        const res = await request(app).post("/musicians").send(musician);

        expect(res.statusCode).toBe(201);
        expect(res.body).toMatchObject(musician);
    })

    test("Verify PUT /musicians/:id", async () => {
        const musician = {
            name: "TDP",
            instrument: "Voice",

        }
        const res = await request(app).put("/musicians/3").send(musician);

        expect(res.statusCode).toBe(200);
        expect(res.body).toMatchObject(musician);
    })

    test("Verify Delete /musicians/:id", async () => {

        const musician = {
            name: "TDP",
            instrument: "Voice",

        }
        
        const res = await request(app).delete("/musicians/3");

        expect(res.statusCode).toBe(200);
        expect(res.body).toMatchObject(musician);
    })
})

describe("/bands endpoint", () => {
    test("Verify GET /bands", async () => {
        const res = await request(app).get("/bands");
        
        console.log(res.body[0].musicians);
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
                        createdAt: expect.any(String),
                        updatedAt: expect.any(String),
                        
                    },                 
                    {
                        id: 1,
                        name: "Mick Jagger",
                        instrument: "Voice",
                        bandId: 1,
                        createdAt: expect.any(String),
                        updatedAt: expect.any(String),
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
