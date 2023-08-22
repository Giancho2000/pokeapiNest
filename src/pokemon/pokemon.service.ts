/* In this doc we can find all the CRUD login of our application.
 This is called by the Pokemon controller file  and execute an specific action. */

import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { v4 as uuid } from 'uuid'
import { Model, isValidObjectId } from 'mongoose';

import { CreatePokemonDto } from './dto/create-pokemon.dto';
import { UpdatePokemonDto } from './dto/update-pokemon.dto';
import { Pokemon } from './entities/pokemon.entity';

@Injectable()
export class PokemonService {

  constructor(

    @InjectModel( Pokemon.name )
    private readonly pokemonModel: Model< Pokemon >
  ){}

  // Create a new Pokemon in db
  async create(createPokemonDto: CreatePokemonDto) {
    createPokemonDto.name = createPokemonDto.name.toLowerCase();

    try {
      
      const pokemon = await this.pokemonModel.create( createPokemonDto );
      return {
        message: 'This action adds a new pokemon',
        pokemon
      };
    } catch (error) {
      if ( error.code === 11000 ) {
        throw new BadRequestException(`Pokemono exists in DB ${ JSON.stringify( error.keyValue ) }`);
      }
      console.log(error);
      throw new InternalServerErrorException(`Can't create Pokemon. - Check server logs`);

    }
  }

  // Get all Pokemos
  findAll() {
    return `This action returns all pokemon`;
  }

  //Get Pokemon by id - name or N°
  async findOne(term: string) {
    let pokemon: Pokemon

    // Search by N°
    if ( !isNaN(+term) ) {
      pokemon = await this.pokemonModel.findOne({ no: term}); 
    }

    // Search by MongoID
    if ( !pokemon && isValidObjectId( term ) ) {
      pokemon = await this.pokemonModel.findById( term );
    }

    // Search by Name
    if ( !pokemon ) {
      pokemon = await this.pokemonModel.findOne({ name: term.toLowerCase().trim() });
    }


    if ( !pokemon ) {
      throw new NotFoundException(`Pokemon with ID, Name or N° " ${ term } " not found`);
    }


    return pokemon;
  }

  // Update a Pokemon
  update(id: number, updatePokemonDto: UpdatePokemonDto) {
    return `This action updates a #${id} pokemon`;
  }

  // Delete Pokemon changing its status
  remove(id: number) {
    return `This action removes a #${id} pokemon`;
  }
}
