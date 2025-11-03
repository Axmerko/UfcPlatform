import Cat from "../database/models/cat.model";
import mongo from "../database/mongo";
import {ObjectId} from "mongodb";
import {CatDto} from "../types/dto/cat.dto";

const catService = {
    cat_collection: mongo.db.collection("cats"),

    async create(catDto: CatDto) {
        const cat = new Cat(catDto.name);

        await this.cat_collection.insertOne(cat);
        return cat;
    },

    async findAll() {
        return await this.cat_collection.find().toArray();
    },

    async findById(id: string) {
        const cat = await this.cat_collection.findOne({_id: new ObjectId(id)});
        return cat;
    },

    async update(id: string, catDto: CatDto) {
        return await this.cat_collection.findOneAndUpdate(
            {_id: new ObjectId(id)},
            {$set: {name: catDto.name}},
            {returnDocument: "after"}
        );
    },

    async delete(id: string) {
        await this.cat_collection.findOneAndDelete({
            _id: new ObjectId(id),
        });
    },
};

export default catService;
