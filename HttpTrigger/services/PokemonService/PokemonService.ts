import { AxiosInstance } from "axios";
import { inject, injectable } from "inversify";

import { IPokemonService } from "./IPokemonService";
import { PokemonQueryParams, Pokemon } from "./types";
import { COMMON_TYPES } from "../../../ioc/commonTypes";

@injectable()
export class PokemonService implements IPokemonService {
    @inject(COMMON_TYPES.pokemonApi)
    private readonly _pokemonApi: AxiosInstance;

    async get(config: PokemonQueryParams) {
        const { ids, type } = config;

        if (!ids.length) {
            return [];
        }

        const pokemons = await this.getByIds(config.ids);

        //comment if type is optional
        if (!type) {
            return pokemons;
        }

        return this.filterPokemonsByType(pokemons, type);
    }

    async getByIds(ids: number[]) {
        return Promise.all(ids.map((id) => this.getById(id)));
    }

    async getById(id: number) {
        return (await this._pokemonApi.get<Pokemon>(`pokemon/${id}`)).data;
    }

    filterPokemonsByType(pokemons: Pokemon[], type) {
        return pokemons.filter((it) =>
            it.types.some((it) => it.type.name === type)
        );
    }
}
