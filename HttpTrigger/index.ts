import { AzureFunction, Context, HttpRequest } from "@azure/functions";
import { container } from "../ioc/inversify.config";
import { COMMON_TYPES } from "../ioc/commonTypes";
import { Logger } from "../commonServices/logger";
import { ILogger } from "../commonServices/iLogger";
import { IFunctionService } from "./services/IFunctionService";

const httpTrigger: AzureFunction = async (ctx: Context, req: HttpRequest): Promise<any> => {
    const logger: Logger = container.get<ILogger>(COMMON_TYPES.ILogger) as Logger;
    logger.init(ctx, "1");

    const functionService: IFunctionService<any> =
        container.get<IFunctionService<any>>(COMMON_TYPES.IFunctionService);
    const response: any = await functionService.processMessageAsync(req.body);
    ctx.res = {
        body: response,
        status: 200,
        headers: { "Content-Type": "application/json" },
    };
    return ctx.res;
};

export default httpTrigger;