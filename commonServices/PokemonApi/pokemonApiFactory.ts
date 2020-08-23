import { AxiosInstance, AxiosStatic } from "axios";

export function pokemonApiFactory(
    axios: AxiosStatic,
    apiUrl: string,
): AxiosInstance {
    return axios.create({ baseURL: apiUrl });
}
