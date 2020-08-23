import { AzureFunction, Context, HttpRequest } from "@azure/functions";
import getContainer from "../ioc/inversify.config";
import { COMMON_TYPES } from "../ioc/commonTypes";
import { Logger } from "../commonServices/logger";
import { ILogger } from "../commonServices/iLogger";
import { Container } from "inversify";
import { IResponseFactory } from "./responses/IResponseFactory";
import { IPokemonsResponse } from "./responses/Pokemon/IPokemonsResponse";
import { IRequestService } from "./services/Request/IRequestService";
import { IErrorResponse } from "./responses/Error/IErrorResponse";

const httpTrigger: AzureFunction = async (ctx: Context, req: HttpRequest): Promise<any> => {
    const container: Container = getContainer();
    const logger: Logger = container.get<ILogger>(COMMON_TYPES.ILogger) as Logger;
    logger.init(ctx, "1");

    const requestService: IRequestService =
        container.get<IRequestService>(COMMON_TYPES.IRequestService);

    const errorResponseFactory: IResponseFactory<IErrorResponse> = container
    .get<IResponseFactory<IErrorResponse>>(COMMON_TYPES.IErrorResponseFactory);
    const pokemonsResponseFactory: IResponseFactory<IPokemonsResponse> =  container
    .get<IResponseFactory<IPokemonsResponse>>(COMMON_TYPES.IPokemonsResponseFactory);

    try {
        const response: any  = await requestService.processRequestAsync(req);
        ctx.res = pokemonsResponseFactory.create({pokemons: response.uniqueIds});
        return ctx.res;
    
    } catch (err) {
        ctx.res = errorResponseFactory.create({error: err.message});
        return ctx.res;
    }
};

export default httpTrigger;
