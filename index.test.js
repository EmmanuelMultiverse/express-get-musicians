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
})

describe("/bands endpoint", () => {
    test("Verify GET /bands", async () => {
        const res = await request(app).get("/bands");
        

        expect(res.statusCode).toBe(200);
        expect(res.body).toMatchObject([
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
