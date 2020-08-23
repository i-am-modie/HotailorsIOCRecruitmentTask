export interface IResponse<T> {
    body: T;
    status: number;
    headers: object;
}
