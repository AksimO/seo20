export const resp200 = (body: Record<string, any>) =>
  Promise.resolve({
    statusCode: 200,
    headers: {
      "Access-Control-Allow-Origin": "*", // Adjust this to allow specific origins if needed
      "Access-Control-Allow-Headers": "Content-Type",
      "Access-Control-Allow-Methods": "OPTIONS,POST,GET", // Adjust based on the methods your Lambda supports
    },
    body: JSON.stringify(body),
  });
