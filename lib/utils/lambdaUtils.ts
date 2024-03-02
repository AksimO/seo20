const DEFAULT_HEADERS = {
  "Access-Control-Allow-Origin": "*", // Adjust this to allow specific origins if needed
  "Access-Control-Allow-Headers": "Content-Type",
  "Access-Control-Allow-Methods": "OPTIONS,POST,GET", // Adjust based on the methods your Lambda supports
};
export const resp = (status: number, body: Record<string, any>) =>
  Promise.resolve({
    statusCode: status,
    headers: DEFAULT_HEADERS,
    body: JSON.stringify(body),
  });

export const resp200 = (body: Record<string, any>) => resp(200, body);
export const resp500 = (body: Record<string, any>) => resp(200, body);
export const resp400 = (body: Record<string, any>) => resp(400, body);
