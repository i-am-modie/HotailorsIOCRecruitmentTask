export interface IRequestService {
    processRequestAsync(req: any): Promise<string[]>;
}
