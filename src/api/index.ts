import axios, { InternalAxiosRequestConfig } from "axios";

declare module "axios" {
  interface AxiosRequestConfig {
    isGuestRequest?: boolean; // Request which is not required authentication
    token?: string;
  }
}

const swishApiUrl = "";

export const Api = axios.create({
  baseURL: `${swishApiUrl}`,
});

Api.interceptors.request.use(
  async (request): Promise<InternalAxiosRequestConfig> => {
    return request;
  }
);

Api.interceptors.response.use(async (response) => {
  const { data } = response;
  //TODO: Cutomize Response Data Parsing
  return Promise.resolve(data);
});

export const getAllOptimals = (): Promise<OptimalBettingLine[]> =>
  Api.get<unknown, OptimalBettingLine[]>("/api/optimals");

export const getAllPoints = (): Promise<MarketPoint[]> =>
  Api.get<unknown, MarketPoint[]>("/api/points");
