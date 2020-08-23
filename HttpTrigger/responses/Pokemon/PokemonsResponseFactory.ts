import { IPokemonsResponse } from "./IPokemonsResponse";
import { injectable } from "inversify";

import { IResponseFactory } from "../IResponseFactory";
import { IResponse } from "../IResponse";

@injectable()
export class PokemonsResponseFactory implements IResponseFactory<IPokemonsResponse> {
    public create(body: IPokemonsResponse): IResponse<IPokemonsResponse> {
        return {
            body,
            status: 200,
            headers: { "Content-Type": "application/json" },
        };
    }
}
