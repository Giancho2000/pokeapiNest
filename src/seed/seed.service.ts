import { BadRequestException, Injectable } from '@nestjs/common';
import axios, { AxiosInstance } from 'axios';
import { PokeResponse } from './interfaces/poke-response.interface';

@Injectable()
export class SeedService {

  private readonly axios: AxiosInstance = axios;

  async executeSeed(){
    try {
      const { data } = await this.axios.get<PokeResponse>('https://pokeapi.co/api/v2/pokemon?limit=5');
      
      data.results.forEach(({name, url}) => {
        const segments = url.split('/');
        const nro = +segments[ segments.length -2 ];
        console.log(name,nro)
      })
      
    } catch (error) {
      console.log(error);
      throw new BadRequestException(`Something is failing with request`);      
    }
  }
}
