import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document } from "mongoose";

@Schema()
export class Pokemon extends Document {

    //id: string | ya Mongo lo identifica
    @Prop({
        unique: true,
        index: true
    })
    name: string;

    @Prop({
        unique: true,
        index: true
    })      
    no: number;

    @Prop({
        default: true,
        index: true
    })
    status: boolean

}


export const PokemoSchema = SchemaFactory.createForClass( Pokemon );