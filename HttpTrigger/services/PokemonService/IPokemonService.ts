import { IPokemon, IPokemonQueryParams } from "./types";

export interface IPokemonService {
    get(config: IPokemonQueryParams): Promise<IPokemon[]>;
}
