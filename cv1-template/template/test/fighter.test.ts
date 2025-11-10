import { describe, it, expect, beforeAll, afterAll, afterEach } from "vitest";
import request from "./request.js";
import mongo from "../src/database/mongo.js";
import 'dotenv/config';



const validFighterPayload = {
    name: "Conor McGregor",
    nickname: "The Notorious",
    weight_class: "Lightweight",
    record: { wins: 22, losses: 6, draws: 0 },
    stats: { knockouts: 19 }
};

describe('Fighter Endpoints', () => {

    // --------------------------------------------------------------------------
    // SETUP A TEARDOWN DATABÁZE
    // --------------------------------------------------------------------------

    beforeAll(async () => {

        await mongo.connect();
    });

    afterAll(async () => {

        await mongo.disconnect();
    });

    afterEach(async () => {

        if (mongo.db) {
            await mongo.db.collection('fighters').deleteMany({});
        }
    });

    // --------------------------------------------------------------------------
    // TESTY PRO JEDNOTLIVÉ ENDPOINTY
    // --------------------------------------------------------------------------

    /**
     * Test 1: POST /fighters
     * Ověří, že můžeme úspěšně vytvořit nového zápasníka.
     */
    it('returns 201 and created fighter on POST /fighters with valid data', async () => {
        const response = await request
            .post('/fighters')
            .send(validFighterPayload)
            .expect(201);


        expect(response.body).toEqual(expect.objectContaining(validFighterPayload));
        expect(response.body._id).toBeDefined();
    });

    /**
     * Test 2: GET /fighters
     * Ověří, že endpoint vrací seznam (pole) všech zápasníků.
     */
    it('returns 200 and an array of fighters on GET /fighters', async () => {

        await request.post('/fighters').send(validFighterPayload);


        const response = await request
            .get('/fighters')
            .expect(200);


        expect(Array.isArray(response.body)).toBe(true);

        expect(response.body.length).toBe(1);

        expect(response.body[0]).toEqual(expect.objectContaining(validFighterPayload));
    });

    /**
     * Test 3: GET /fighters/:id
     * Ověří, že můžeme načíst jednoho konkrétního zápasníka podle jeho ID.
     */
    it('returns 200 and the correct fighter on GET /fighters/:id', async () => {

        const postResponse = await request.post('/fighters').send(validFighterPayload);
        const createdFighterId = postResponse.body._id; // Získáme jeho ID


        const getResponse = await request
            .get(`/fighters/${createdFighterId}`)
            .expect(200); // Očekáváme 200 (OK)


        expect(getResponse.body).toEqual(expect.objectContaining(validFighterPayload));
        expect(getResponse.body._id).toBe(createdFighterId);
    });

    /**
     * Test 4: PUT /fighters/:id
     * Ověří, že můžeme aktualizovat existujícího zápasníka.
     */
    it('returns 200 and the updated fighter on PUT /fighters/:id', async () => {

        const postResponse = await request.post('/fighters').send(validFighterPayload);
        const createdFighterId = postResponse.body._id;


        const updatePayload = {
            ...validFighterPayload,
            nickname: "Mystic Mac"
        };


        const putResponse = await request
            .put(`/fighters/${createdFighterId}`)
            .send(updatePayload)
            .expect(200); // Očekáváme 200 (OK)


        expect(putResponse.body.nickname).toBe("Mystic Mac");
        expect(putResponse.body._id).toBe(createdFighterId);
    });

    /**
     * Test 5: DELETE /fighters/:id
     * Ověří, že můžeme smazat zápasníka.
     */
    it('returns 204 on DELETE /fighters/:id and the fighter is gone', async () => {

        const postResponse = await request.post('/fighters').send(validFighterPayload);
        const createdFighterId = postResponse.body._id;


        await request
            .delete(`/fighters/${createdFighterId}`)
            .expect(204);


        await request
            .get(`/fighters/${createdFighterId}`)
            .expect(404);
    });
});