import { AxiosInstance } from "axios";
import { inject, injectable } from "inversify";

import { IPokemonService } from "./IPokemonService";
import { IPokemon, IPokemonQueryParams } from "./types";
import { COMMON_TYPES } from "../../../ioc/commonTypes";

@injectable()
export class PokemonService implements IPokemonService {
    @inject(COMMON_TYPES.pokemonApi)
    private readonly _pokemonApi: AxiosInstance;

    public async get(config: IPokemonQueryParams): Promise<IPokemon[]> {
        const { ids, type } = config;

        if (!ids.length) {
            return [];
        }

        const pokemons: IPokemon[] = await this.getByIds(config.ids);

        // assumed type is not required
        if (!type) {
            return pokemons;
        }

        return this.filterPokemonsByType(pokemons, type);
    }

    public async getByIds(ids: number[]): Promise<IPokemon[]> {
        return Promise.all(ids.map((id) => this.getById(id)));
    }

    public async getById(id: number): Promise<IPokemon> {
        return (await this._pokemonApi.get<IPokemon>(`pokemon/${id}`)).data;
    }

    private filterPokemonsByType(pokemons: IPokemon[], type: string): IPokemon[] {
        return pokemons.filter((pokemon) =>
            pokemon.types.some((typeObject) => typeObject.type.name === type),
        );
    }
}
