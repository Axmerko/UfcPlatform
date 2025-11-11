import * as express from "express";
import fighterService from "../../services/fighter.service.js";
import { FighterDto } from "../../types/dto/fighter.dto.js";
import { ObjectId } from "mongodb";

/**
 * @openapi
 * /fighters:
 *   post:
 *     summary: Create a new fighter
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/FighterDto'
 *     responses:
 *       '201':
 *         description: Fighter created
 *       '400':
 *         description: Invalid input
 *   get:
 *     summary: Get all fighters
 *     responses:
 *       '200':
 *         description: A list of fighters
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Fighter'
 */

/**
 * @openapi
 * /fighters/{id}:
 *   get:
 *     summary: Get a fighter by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: A single fighter
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Fighter'
 *       '404':
 *         description: Fighter not found
 *       '400':
 *         description: Invalid ID
 *   put:
 *     summary: Update a fighter by ID
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
 *             $ref: '#/components/schemas/FighterDto'
 *     responses:
 *       '200':
 *         description: Fighter updated
 *       '404':
 *         description: Fighter not found
 *       '400':
 *         description: Invalid input
 *   delete:
 *     summary: Delete a fighter by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '204':
 *         description: Fighter deleted
 *       '404':
 *         description: Fighter not found
 *       '400':
 *         description: Invalid ID
 */

function handleControllerError(res: express.Response, error: unknown, message: string) {
    let errorMessage = "An unknown error occurred";
    if (error instanceof Error) {
        errorMessage = error.message;
    }
    res.status(500).json({ message, error: errorMessage });
}

const fighterController = {
    async create(req: express.Request, res: express.Response) {
        try {
            const newFighter = await fighterService.create(req.body as FighterDto);
            res.status(201).json(newFighter);
        } catch (error) {
            handleControllerError(res, error, "Error creating Fighter");
        }
    },

    async findAll(req: express.Request, res: express.Response) {
        try {
            const allFighters = await fighterService.findAll();
            res.status(200).json(allFighters);
        } catch (error) {
            handleControllerError(res, error, "Chyba při vrácení všech fighterů");
        }
    },

    async findById(req: express.Request, res: express.Response) {
        try {
            const id = req.params.id;
            if (!ObjectId.isValid(id)) {
                return res.status(400).json({ message: "Invalid ID format" });
            }
            const fighter = await fighterService.findById(id);
            if (fighter) {
                res.status(200).json(fighter);
            } else {
                res.status(404).json({ message: "Fighter cannot found" });
            }
        } catch (error) {
            handleControllerError(res, error, "Error finding fighter");
        }
    },

    async update(req: express.Request, res: express.Response) {
        try {
            const id = req.params.id;
            if (!ObjectId.isValid(id)) {
                return res.status(400).json({ message: "Invalid ID format" });
            }
            const updatedFighter = await fighterService.update(id, req.body as FighterDto);
            if (updatedFighter) {
                res.status(200).json(updatedFighter);
            } else {
                res.status(404).json({ message: "Fighter not found" });
            }
        } catch (error) {
            handleControllerError(res, error, "Error updating fighter");
        }
    },

    async delete(req: express.Request, res: express.Response) {
        try {
            const id = req.params.id;
            if (!ObjectId.isValid(id)) {
                return res.status(400).json({ message: "Invalid ID format" });
            }
            const deletedFighter = await fighterService.delete(id);
            if (deletedFighter) {
                res.sendStatus(204);
            } else {
                res.status(404).json({ message: "Fighter not found" });
            }
        } catch (error) {
            handleControllerError(res, error, "Error deleting fighter");
        }
    },
};

export default fighterController;