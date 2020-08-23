import { Pokemon, PokemonQueryParams } from "./types";

export interface IPokemonService{
    get(config: PokemonQueryParams): Promise<Pokemon[]>
}