import {IsNotEmpty, IsObject, IsOptional, IsString} from "class-validator";

export class FighterDto {
    @IsNotEmpty()
    @IsString()
    name: string;

    @IsOptional()
    @IsString()
    nickname: string;

    @IsNotEmpty()
    @IsString()
    weight_class: string;

    @IsNotEmpty()
    @IsObject()
    record: Object;

    @IsNotEmpty()
    @IsObject()
    stats: Object;
}
