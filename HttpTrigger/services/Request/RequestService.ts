import { inject, injectable } from "inversify";

import { IRequestService } from "./IRequestService";
import { COMMON_TYPES } from "../../../ioc/commonTypes";
import { IPokemonService } from "../PokemonService/IPokemonService";
import { ILogger } from "../../../commonServices/Logger/iLogger";

@injectable()
export class RequestService implements IRequestService {
    @inject(COMMON_TYPES.ILogger)
    private readonly _logger: ILogger;

    public async processRequestAsync(req: any): Promise<any> {
        const url: URL = new URL(req.url);

        const [type, ...restOfTypes] = url.searchParams.getAll("type")
        const idsArray = url.searchParams.getAll("id").map(Number).filter(Boolean);


        if (!type) {
            throw new Error("No Type Provided");
        }
        
        if(restOfTypes.length !== 0){
            throw new Error("More than one type provided");
        }

        if (!idsArray.length) {
            throw new Error("No ids Provided");
        }

        const uniqueIdsArray: number[] = [...new Set(idsArray)];

        return { uniqueIds: uniqueIdsArray.map((it) => it.toString()) };
    }
}
