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
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *     responses:
 *       201:
 *         description: Fighter created
 *       400:
 *         description: Invalid input
 *   get:
 *     summary: Get all fighters
 *     responses:
 *       200:
 *         description: A list of fighters
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
 *       200:
 *         description: A single fighter
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
 *         description: Fighter not found
 *       400:
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
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *     responses:
 *       200:
 *         description: Fighter updated
 *       404:
 *         description: Fighter not found
 *       400:
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
 *       204:
 *         description: Fighter deleted
 *       404:
 *         description: Fighter not found
 *       400:
 *         description: Invalid ID
 */
import * as express from "express";
import fighterService from "../../services/fighter.service";
import {FighterDto} from "../../types/dto/fighter.dto";
import {validate} from "class-validator";

//! Make sure you are using correct response codes and messages
//! All methods are async, and all methods should be handled with try/fighterch blocks
const fighterController = {
    async create(req: express.Request, res: express.Response) {
        try{
            // Plníme DTO všemi daty z req.body
            const fighterDto = new FighterDto();
            fighterDto.name = req.body.name;
            fighterDto.nickname = req.body.nickname;
            fighterDto.weight_class = req.body.weight_class;
            fighterDto.record = req.body.record;
            fighterDto.stats = req.body.stats;

            // Validujeme DTO
            const errors = await validate(fighterDto);
            if (errors.length > 0) {
                return res.status(400).json({message: "Validate failed", errors: errors});
            }

            // Posíláme DTO do servisu
            const newFighter = await fighterService.create(fighterDto);
            res.status(201).json(newFighter);

        } catch (error) {
            res.status(500).json({message: "Error creating Fighter", error: error.message });
        }
    },

    async findAll(req: express.Request, res: express.Response) {
        try{
            const allFighters = await fighterService.findAll();
            // Posíláme zpět rovnou pole
            res.status(200).json(allFighters);
        } catch (error) {
            res.status(500).json({ message: "Chyba při vrácení všech fighterů", error: error.message });
        }
    },

    async findById(req: express.Request, res: express.Response) {
        try{
            const id = req.params.id;
            const fighter = await fighterService.findById(id);

            if(fighter){
                // Nalezeno
                res.status(200).json(fighter);
            } else {
                // Nenalezeno
                res.status(404).json({message: "Fighter cannot found"})
            }

        }catch (error) {
            res.status(500).json({message: "Error finding fighter", error: error.message});
        }
    },

    async update(req: express.Request, res: express.Response) {
        try{
            const id = req.params.id;

            // Plníme DTO všemi daty z req.body
            const fighterDto = new FighterDto();
            fighterDto.name = req.body.name;
            fighterDto.nickname = req.body.nickname;
            fighterDto.weight_class = req.body.weight_class;
            fighterDto.record = req.body.record;
            fighterDto.stats = req.body.stats;

            // Validujeme DTO
            const errors = await validate(fighterDto);
            if (errors.length > 0) {
                return res.status(400).json({message: "Validate failed", errors: errors});
            }

            // Posíláme DTO a ID do servisu
            const updatedFighter = await fighterService.update(id,fighterDto);

            if(updatedFighter){
                // Nalezeno a upraveno
                res.status(200).json(updatedFighter);
            }else{
                // Nenalezeno (ID neexistuje)
                res.status(404).json({message: "Fighter not found"})
            }

        }catch(error){
            res.status(500).json({message: "Error updating fighter", error: error.message});
        }
    },

    async delete(req: express.Request, res: express.Response) {
        try{
            // Celá logika musí být v try bloku
            const id = req.params.id;
            await fighterService.delete(id);

            // Správná odpověď pro DELETE
            res.sendStatus(204);

        }catch(error){
            res.status(500).json({message: "Error deleting fighter", error: error.message});
        }
    },
};

export default fighterController;