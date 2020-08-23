export interface PokemonQueryParams {
    ids: number[],
    type?: string
}

export interface type {
    type:{
        name: string
    }
     // here you can type more fields when needed
}

export interface Pokemon {
    name: string,
    types: type[]
    // here you can type more fields when needed
}