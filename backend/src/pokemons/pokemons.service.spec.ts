import { InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { PokemonsService } from './pokemons.service';
import axios from 'axios';
import { Test } from '@nestjs/testing';

// remplace les appels reseau par un mock jest
jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('PokemonsService', () => {
	let service: PokemonsService;

  	beforeEach(async () => {
		const moduleRef = await Test.createTestingModule({
			providers: [PokemonsService],
		}).compile();

		service = moduleRef.get<PokemonsService>(PokemonsService);
  	});

	it('devrait formater correctement la réponse API', async () => {
		mockedAxios.get.mockResolvedValueOnce({
			data: {
				id: 1,
				name: 'bulbasaur',
				height: 7,
				weight: 69,
				types: [{type: {name: 'grass'}}, {type: {name: 'poison'}}],
				abilities: [{ability: {name: 'overgrow'}}, {ability: {name: 'chlorophyll'}}],
				sprites: {
					front_default: 'front.png',
					back_default: 'back.png',
					front_shiny: 'front_shiny.png',
					back_shiny: 'back_shiny.png',
				},
				stats: [
					{stat: {name: 'hp'}, base_stat: 45},
					{stat: {name: 'attack'}, base_stat: 49},
				],
			},
		});
	
		const result = await service.getPokemonById(1);
	
		expect(result).toEqual({
			id: 1,
			name: 'bulbasaur',
			height: 7,
			weight: 69,
			types: ['grass', 'poison'],
			abilities: ['overgrow', 'chlorophyll'],
			sprites: {
				front: 'front.png',
				back: 'back.png',
				front_shiny: 'front_shiny.png',
				back_shiny: 'back_shiny.png',
			},
			stats: [
				{name: 'hp', base: 45},
				{name: 'attack', base: 49},
			],
		});
	});

	it('devrait lancer NotFoundException si le Pokemon est introuvable', async () => {
		mockedAxios.get.mockRejectedValueOnce({ 
			response: {status: 404}
		});
		await expect(service.getPokemonById(99999))
		.rejects
		.toThrow(NotFoundException);
	});

	it('devrait lancer InternalServerErrorException pour toute autre erreur', async () => {
		mockedAxios.get.mockRejectedValueOnce({ 
			response: {status: 500}
		});
		await expect(service.getPokemonById(1))
		.rejects
		.toThrow(InternalServerErrorException);
	});
});
