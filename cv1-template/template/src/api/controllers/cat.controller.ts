/**
 * @openapi
 * /cats:
 *   post:
 *     summary: Create a new cat
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *     responses:
 *       201:
 *         description: Cat created
 *       400:
 *         description: Invalid input
 *   get:
 *     summary: Get all cats
 *     responses:
 *       200:
 *         description: A list of cats
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   name:
 *                     type: string
 *                   id:
 *                     type: string
 * /cats/{id}:
 *   get:
 *     summary: Get a cat by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: A single cat
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 name:
 *                   type: string
 *                 id:
 *                   type: string
 *       404:
 *         description: Cat not found
 *       400:
 *         description: Invalid ID
 *   put:
 *     summary: Update a cat by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *     responses:
 *       200:
 *         description: Cat updated
 *       404:
 *         description: Cat not found
 *       400:
 *         description: Invalid input
 *   delete:
 *     summary: Delete a cat by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Cat deleted
 *       404:
 *         description: Cat not found
 *       400:
 *         description: Invalid ID
 */
import * as express from "express";

//! Make sure you are using correct response codes and messages
//! All methods are async, and all methods should be handled with try/catch blocks
const catController = {
    async create(req: express.Request, res: express.Response) {
        //TODO: Implement create logic
    },

    async findAll(req: express.Request, res: express.Response) {
        //TODO: Implement findAll logic
    },

    async findById(req: express.Request, res: express.Response) {
        //TODO: Implement findById logic
    },

    async update(req: express.Request, res: express.Response) {
        //TODO: Implement update logic
    },

    async delete(req: express.Request, res: express.Response) {
        //TODO: Implement delete logic
    },
};

export default catController;
