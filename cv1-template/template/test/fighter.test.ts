import {describe, it} from "vitest";
import request from "./request";

describe('status', () => {
    it('returns 201 on /fighters', async () => {
        const payload = {"name": "Bert"}
        await request
            .post('/fighters')
            .send(payload)
            .expect(201)
    })
})
