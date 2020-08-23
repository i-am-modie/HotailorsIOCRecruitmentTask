import { injectable } from "inversify";

import { IErrorResponse } from "./IErrorResponse";
import { IResponseFactory } from "../IResponseFactory";
import { IResponse } from "../IResponse";

@injectable()
export class ErrorResponseFactory implements IResponseFactory<IErrorResponse> {
    public create(body: IErrorResponse): IResponse<IErrorResponse> {
        return {
            body,
            status: 400,
            headers: { "Content-Type": "application/json" },
        }; 
    }
}
