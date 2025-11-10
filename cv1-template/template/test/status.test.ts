import {describe, it} from "vitest";
import request from "./request.js";
import 'dotenv/config';

describe('status', () => {
    it('returns 200 on /status', async () => {
        await request
            .get('/status')
            .expect(200)
    })
})
