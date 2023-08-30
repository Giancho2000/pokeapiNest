import { Module } from '@nestjs/common';
import { SeedService } from './seed.service';
import { SeedController } from './seed.controller';
import { PokemonModule } from 'src/pokemon/pokemon.module';

@Module({
  controllers: [SeedController],
  providers: [SeedService],
  imports:[
    PokemonModule // Importo el modulo y tengo acceso a todos sus componentes
  ]
})
export class SeedModule {}
