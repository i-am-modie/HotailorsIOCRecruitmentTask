import { IResponse } from "./IResponse";

export interface IResponseFactory<T> {
    create(body: T): IResponse<T>;
}
