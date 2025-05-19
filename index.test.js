// install dependencies
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
        const responseJson = JSON.parse(response.text);

        expect(response.statusCode).toBe(200);
        expect(responseJson).toMatchObject([
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
})

describe("/bands endpoint", () => {
    test("Verify GET /bands", async () => {
        const res = await request(app).get("/bands");
        const resJSON = JSON.parse(res.text);

        expect(res.statusCode).toBe(200);
        expect(resJSON).toMatchObject([
            {
                name: 'The Beatles',
                genre: 'Rock'
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
