import { InjectModel } from '@nestjs/mongoose';
import { BadRequestException, Injectable } from '@nestjs/common';

import { Model } from 'mongoose';

import { PokeResponse } from './interfaces/poke-response.interface';
import { Pokemon } from 'src/pokemon/entities/pokemon.entity';
import { AxiosAdapter } from 'src/common/adapters/axios.adapter';

@Injectable()
export class SeedService {

  constructor(

    @InjectModel( Pokemon.name )
    private readonly pokemonModel: Model< Pokemon >,
    
    private readonly http: AxiosAdapter 

  ){}

  async executeSeed(){
    await this.pokemonModel.deleteMany({}); // delete * from 'tableName';
    
    try {

      const data = await this.http.get<PokeResponse>('https://pokeapi.co/api/v2/pokemon?limit=500');
      
      const pokemonToInsert:{name:string, no:number}[] = [];

      data.results.forEach( async({name, url}) => {
        const segments = url.split('/');
        const no = +segments[ segments.length -2 ];

        pokemonToInsert.push({name, no});
        //const pokemon = await this.pokemonModel.create( {name, no} );
      });

      await this.pokemonModel.insertMany( pokemonToInsert );

      return 'Seed executed';
      
    } catch (error) {
      console.log(error);
      throw new BadRequestException(`Something is failing with request`);      
    }
  }
}
