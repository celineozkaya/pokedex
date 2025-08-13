
import { Test } from '@nestjs/testing';
import { PokemonsController } from './pokemons.controller';
import { PokemonsService } from './pokemons.service';
import { BadRequestException } from '@nestjs/common';

describe('PokemonsController', () => {
	let pokemonsController: PokemonsController;
	let pokemonsService: PokemonsService;

	const mockPokemon = {
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
  	};

	beforeEach(async () => {
		const moduleRef = await Test.createTestingModule({
			controllers: [PokemonsController],
			providers: [
				{
				provide: PokemonsService,
				useValue: {
					getPokemonById: jest.fn().mockResolvedValue(mockPokemon), // mock getPokemonById() (fonction qui fait rien)
				},
				},
			],
		}).compile();

		pokemonsService = moduleRef.get(PokemonsService);
		pokemonsController = moduleRef.get(PokemonsController);
	});

	it('devrait retourner un Pokemon valide', async () => {
		const result = await pokemonsController.findOne(1);
		expect(result).toEqual(mockPokemon);
		expect(pokemonsService.getPokemonById).toHaveBeenCalledWith(1);
	});
	
	it('devrait lancer une erreur si ID < 1', async () => {
		await expect(pokemonsController.findOne(0)).rejects.toThrow(BadRequestException);
		expect(pokemonsService.getPokemonById).not.toHaveBeenCalled();
	});
});
