//gere les req http vers /pokemon
//  defini prefix /pokemon + get id


import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { PokemonsService } from './pokemons.service';

@Controller('pokemons')
export class PokemonsController {

    constructor(private readonly pokemonsService: PokemonsService) {}

    @Get(':id')
    async findOne(@Param('id', ParseIntPipe) id: number) {
        return await this.pokemonsService.getPokemonById(id);
    }
}