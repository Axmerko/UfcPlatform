import {IsNotEmpty} from "class-validator";

export class CatDto {
    @IsNotEmpty()
    name: string;
}
