export interface IPokemonQueryParams {
    ids: number[];
    type?: string;
}

export interface IType {
    type: {
        name: string,
    };
    // here you can type more fields when needed
}

export interface IPokemon {
    name: string;
    types: IType[];
    // here you can type more fields when needed
}
