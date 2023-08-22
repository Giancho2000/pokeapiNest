import { IsBoolean, IsInt, IsNumber, IsOptional, IsPositive, IsString, Length, Min } from "class-validator";


export class CreatePokemonDto {

    @IsString()
    @Length(2, 10)
    name: string;

    @IsNumber()
    @IsPositive()
    @Min(1)
    @IsInt()
    no: number;

    @IsOptional()
    @IsBoolean()
    status: boolean;

}
