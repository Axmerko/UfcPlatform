import {ObjectId} from "mongodb";

export default class Fighter {
    public _id?: ObjectId;

    public name: string;
    public nickname: string;
    public weight_class: string;
    public record: Object;
    public stats: Object;

    constructor(
         name: string,
         nickname: string,
         weight_class: string,
         record: Object,
        stats: Object
    ) {
        this.name = name;
        this.nickname = nickname;
        this.weight_class = weight_class;
        this.record = record;
        this.stats = stats;
    }
}
