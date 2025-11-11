import { IsNotEmpty, IsObject, IsOptional, IsString } from "class-validator";

/**
 * @openapi
 * components:
 *   schemas:
 *     FighterDto:
 *       type: object
 *       description: Payload for creating or updating a fighter.
 *       required:
 *         - name
 *         - weight_class
 *         - record
 *         - stats
 *       properties:
 *         name:
 *           type: string
 *         nickname:
 *           type: string
 *         weight_class:
 *           type: string
 *         record:
 *           type: object
 *           description: Fighter's win/loss/draw record
 *           example:
 *             wins: 22
 *             losses: 6
 *             draws: 0
 *         stats:
 *           type: object
 *           description: Fighter's statistics
 *           example:
 *             knockouts: 19
 *     Fighter:
 *       type: object
 *       description: A fighter object as returned from the database.
 *       properties:
 *         _id:
 *           type: string
 *           description: The auto-generated ObjectId of the fighter
 *           example: 60d0fe4f5311236168a109ca
 *         name:
 *           type: string
 *         nickname:
 *           type: string
 *         weight_class:
 *           type: string
 *         record:
 *           type: object
 *           example:
 *             wins: 22
 *             losses: 6
 *             draws: 0
 *         stats:
 *           type: object
 *           example:
 *             knockouts: 19
 */

export class FighterDto {
    @IsNotEmpty()
    @IsString()
    name!: string;

    @IsOptional()
    @IsString()
    nickname!: string;

    @IsNotEmpty()
    @IsString()
    weight_class!: string;

    @IsNotEmpty()
    @IsObject()
    record!: object;

    @IsNotEmpty()
    @IsObject()
    stats!: object;
}
