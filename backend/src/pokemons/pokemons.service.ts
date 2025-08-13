// logique metier : interroge la pokeApi

import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import axios from 'axios';

interface PokemonAPIResponse {
    id: number;
    name: string;
    height: number;
    weight: number;
    types: { 
        type: { name: string } 
    }[];
    abilities: { 
        ability: { name: string } 
    }[];
    sprites: {
        front_default: string;
        back_default: string;
        front_shiny: string;
        back_shiny: string;
    };
    stats: { 
        base_stat: number; 
        stat: { name: string } 
    }[];
}

export interface IPokemon {
    id: number;
    name: string;
    height: number;
    weight: number;
    types: string[];
    abilities: string[];
    sprites: {
        front: string;
        back: string;
        front_shiny: string;
        back_shiny: string;
    };
    stats: { 
        name: string;
        base: number; 
    }[];
}

@Injectable()
export class PokemonsService {
    
    private readonly baseUrl = 'https://pokeapi.co/api/v2/pokemon';

    async getPokemonById(id: number) : Promise<IPokemon>{
        return await axios.get<PokemonAPIResponse>(`${this.baseUrl}/${id}`)
        .then(res=>{
            const data = res.data;

            const formattedData : IPokemon = {
                id: data.id,
                name: data.name,
                height: data.height,
                weight: data.weight,
                types: data.types.map((t) => t.type.name),
                abilities: data.abilities.map((a) => a.ability.name),
                sprites: {
                    front: data.sprites.front_default,
                    back: data.sprites.back_default,
                    front_shiny: data.sprites.front_shiny,
                    back_shiny: data.sprites.back_shiny,
                },
                stats: data.stats.map((s) => ({
                    name: s.stat.name,
                    base: s.base_stat,
                })),
            };

            console.log(formattedData);
            return formattedData;   
        })
        .catch((err) => {
            if(err.response?.status === 404){
                throw new NotFoundException(`Le Pokemon n°${id} n'existe pas.`);
            }
            throw new InternalServerErrorException('Erreur lors de la récupération du Pokemon.');
        });
    }
}
