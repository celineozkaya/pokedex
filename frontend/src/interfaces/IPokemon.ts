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