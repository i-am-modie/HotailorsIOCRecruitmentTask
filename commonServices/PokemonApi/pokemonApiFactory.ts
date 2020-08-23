import { AxiosStatic } from "axios";

export const pokemonApiFactory = (axios: AxiosStatic, apiUrl: string) => {
    return axios.create({ baseURL: apiUrl });
};
