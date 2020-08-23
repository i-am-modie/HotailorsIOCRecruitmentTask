import "reflect-metadata";
import { Container } from "inversify";
import { AxiosStatic, AxiosInstance } from "axios";

import { COMMON_TYPES } from "./commonTypes";
import { IFunctionService } from "../HttpTrigger/services/IFunctionService";
import { FunctionService } from "../HttpTrigger/services/FunctionService";
import { IPokemonsResponse } from "../HttpTrigger/responses/Pokemon/IPokemonsResponse";
import { PokemonsResponseFactory } from "../HttpTrigger/responses/Pokemon/PokemonsResponseFactory";
import { IResponseFactory } from "../HttpTrigger/responses/IResponseFactory";
import { IRequestService } from "../HttpTrigger/services/Request/IRequestService";
import { RequestService } from "../HttpTrigger/services/Request/RequestService";
import { IErrorResponse } from "../HttpTrigger/responses/Error/IErrorResponse";
import { ErrorResponseFactory } from "../HttpTrigger/responses/Error/ErrorResponseFactory";
import { POKE_API_URL } from "../commonServices/PokemonApi/constants";
import { axios } from "../commonServices/axios";
import { pokemonApiFactory } from "../commonServices/PokemonApi/pokemonApiFactory";
import { ILogger } from "../commonServices/Logger/iLogger";
import { Logger } from "../commonServices/Logger/logger";

const getContainer: () => Container = (): Container => {
    const container: Container = new Container();

    container.bind<ILogger>(COMMON_TYPES.ILogger).to(Logger).inSingletonScope();

    container
        .bind<IFunctionService<any>>(COMMON_TYPES.IFunctionService)
        .to(FunctionService);

    container
        .bind<IRequestService>(COMMON_TYPES.IRequestService)
        .to(RequestService);

    container
    container
        .bind<IResponseFactory<IErrorResponse>>(
            COMMON_TYPES.IErrorResponseFactory
        )
        .to(ErrorResponseFactory);

    container
        .bind<IResponseFactory<IPokemonsResponse>>(
            COMMON_TYPES.IPokemonsResponseFactory
        )
        .to(PokemonsResponseFactory);

    container
        .bind<AxiosInstance>(COMMON_TYPES.pokemonApi)
        .toConstantValue(pokemonApiFactory(axios, POKE_API_URL));

    container.bind<AxiosStatic>(COMMON_TYPES.axios).toConstantValue(axios);

    container
        .bind<string>(COMMON_TYPES.pokemonApiURL)
        .toConstantValue(POKE_API_URL);

    return container;
};

export default getContainer;
