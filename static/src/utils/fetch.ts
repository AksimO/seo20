import { config } from "../config";
import { hookify } from "./hookify";

const prepareUrl = (url: string) => `${config.API_ROOT}${url}`;
export const request = (url: string) => {
  return fetch(prepareUrl(url)).then((r) => r.json());
};

export const useFetch = hookify<[string, RequestInit?]>(request);
