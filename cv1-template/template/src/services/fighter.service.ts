import Fighter from "../database/models/fighter.model.js";
import mongo from "../database/mongo.js";
import {ObjectId} from "mongodb";
import {FighterDto} from "../types/dto/fighter.dto.js";

const fighterService = {
    get fighter_collection() {
        if (!mongo.db) {
            throw new Error("Databáze není inicializována! Zavolejte mongo.connect().");
        }
        return mongo.db.collection("fighters");
    },

    async create(fighterDto: FighterDto) {
        const fighter = new Fighter(
            fighterDto.name,
            fighterDto.nickname,
            fighterDto.weight_class,
            fighterDto.record,
            fighterDto.stats,
        );

        await this.fighter_collection.insertOne(fighter);
        return fighter;
    },

    async findAll() {
        return await this.fighter_collection.find().toArray();
    },

    async findById(id: string) {
        const fighter = await this.fighter_collection.findOne({_id: new ObjectId(id)});
        return fighter;
    },

    async update(id: string, fighterDto: FighterDto) {
        return await this.fighter_collection.findOneAndUpdate(
            {_id: new ObjectId(id)},
            {$set: {
                name: fighterDto.name,
                    nickname: fighterDto.nickname,
                    weight_class: fighterDto.weight_class,
                    record: fighterDto.record,
                    stats: fighterDto.stats,
            }},
            {returnDocument: "after"}
        );
    },

    async delete(id: string) {
        await this.fighter_collection.findOneAndDelete({
            _id: new ObjectId(id),
        });
    },
};

export default fighterService;
