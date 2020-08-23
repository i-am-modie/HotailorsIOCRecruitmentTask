import { AzureFunction, Context, HttpRequest } from "@azure/functions";
import getContainer from "../ioc/inversify.config";
import { COMMON_TYPES } from "../ioc/commonTypes";
import { Logger } from "../commonServices/Logger/logger";
import { ILogger } from "../commonServices/Logger/iLogger";
import { Container } from "inversify";
import { IResponseFactory } from "./responses/IResponseFactory";
import { IPokemonsResponse } from "./responses/Pokemon/IPokemonsResponse";
import { IRequestService } from "./services/Request/IRequestService";
import { IErrorResponse } from "./responses/Error/IErrorResponse";
import { RequestService } from "./services/Request/RequestService";

const httpTrigger: AzureFunction = async (
    ctx: Context,
    req: HttpRequest
): Promise<any> => {
    const container: Container = getContainer();

    const logger: Logger = container.get<ILogger>(
        COMMON_TYPES.ILogger
    ) as Logger;
    logger.init(ctx, "1");

    const requestService: RequestService = container.get<IRequestService>(
        COMMON_TYPES.IRequestService
    ) as RequestService;

    const errorResponseFactory: IResponseFactory<IErrorResponse> = container.get<
        IResponseFactory<IErrorResponse>
    >(COMMON_TYPES.IErrorResponseFactory);
    const pokemonsResponseFactory: IResponseFactory<IPokemonsResponse> = container.get<
        IResponseFactory<IPokemonsResponse>
    >(COMMON_TYPES.IPokemonsResponseFactory);

    try {
        const pokemonNames: string[] = await requestService.processRequestAsync(
            req
        );
        ctx.res = pokemonsResponseFactory.create({ pokemons: pokemonNames });
    } catch (err) {
        ctx.res = errorResponseFactory.create({ error: err.message });
    }
    return ctx.res;
};

export default httpTrigger;
