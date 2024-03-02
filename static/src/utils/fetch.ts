import { config } from "../config";
import { hookify } from "./hookify";

const prepareUrl = (url: string) => `${config.API_ROOT}${url}`;
export const request = (url: string) => {
  return fetch(prepareUrl(url)).then((r) => r.json());
};

const submit = (url: string, data: Record<string, string> = {}) => {
  // Options to configure the fetch request
  const fetchOptions = {
    method: "POST", // Use the POST method to send data
    headers: {
      "Content-Type": "application/json", // Indicate we're sending JSON data
    },
    body: JSON.stringify(data), // Convert the JavaScript object to a JSON string
  };

  // Sending the request
  return fetch(prepareUrl(url), fetchOptions).then((response) =>
    response.json()
  ); // Convert the response to JSON
};
export const useFetch = hookify<[string, RequestInit?]>(request);
export const useSubmit = hookify<[string, Record<string, string>?]>(submit, {
  autoRequest: false,
});
