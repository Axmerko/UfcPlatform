import {server} from "../src/api/server.js";
import supertest from 'supertest';

const request = supertest(server)

export default request
