// logique metier : interroge la pokeApi

import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class PokemonsService {
    
    private readonly baseUrl = 'https://pokeapi.co/api/v2/pokemon';

    async getPokemonById(id: number) {
        await axios.get(`${this.baseUrl}/${id}`)
        .then(res=>{
            console.log(res.data);
            return(res.data);
        })
        .catch(err=> console.error("Erreur lors de la recuperation du pokémon :", err));
    }
}
