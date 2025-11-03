import {ObjectId} from "mongodb";

export default class Cat {
    public _id?: ObjectId;

    constructor(public name: string) {
    }
}
