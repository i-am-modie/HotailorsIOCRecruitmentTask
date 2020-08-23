import { inject, injectable } from "inversify";

import { IRequestService } from "./IRequestService";
import { COMMON_TYPES } from "../../../ioc/commonTypes";
import { IPokemonService } from "../PokemonService/IPokemonService";
import { IPokemon } from "../PokemonService/types";

@injectable()
export class RequestService implements IRequestService {
    @inject(COMMON_TYPES.IPokemonService)
    private readonly _pokemonService: IPokemonService;

    public async processRequestAsync(req: any): Promise<string[]> {
        const url: URL = new URL(req.url);

        const [type, ...restOfTypes] = url.searchParams.getAll("type");

        // if id can be 0 change this filter
        const idsArray: number[] = url.searchParams
            .getAll("id")
            .map(Number)
            .filter(Boolean);

        // assumed that type argument is not required
        // if (!type) {
        //     throw new Error("No Type Provided");
        // }

        if (restOfTypes.length !== 0) {
            throw new Error("More than one type provided");
        }

        if (!idsArray.length) {
            throw new Error("No ids Provided");
        }

        const uniqueIdsArray: number[] = [...new Set(idsArray)];

        const pokemons: IPokemon[] = await this._pokemonService.get({
            ids: uniqueIdsArray,
            type,
        });

        return pokemons.map((it) => it.name);
    }
}
