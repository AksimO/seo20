import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, PutCommand } from "@aws-sdk/lib-dynamodb";
import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { resp200, resp400, resp500 } from "../../utils/lambdaUtils";
import { v4 as uuidv4 } from "uuid";
import { isValidUrl, tryParseJson } from "./utils";

// Initialize the DynamoDB Client
const client = new DynamoDBClient({ region: process.env.AWS_REGION });
const dynamoDb = DynamoDBDocumentClient.from(client);

const WEBSITES_TABLE = process.env.WEBSITES_TABLE;

// Lambda handler function
export const lambdaAddWebsite = (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  // Parse `origin` and `topic` from the event
  const { origin, topic, s3path } = tryParseJson(event.body || "{}") || {};

  if (!isValidUrl(origin)) {
    return resp400({ message: "Origin should be valid URL" });
  }

  const data = {
    origin,
    topic,
    s3path,
    // Add any other necessary fields here
    id: uuidv4(),
    createdAt: Date.now(),
  };
  // Parameters for the DynamoDB put operation
  const params = {
    TableName: WEBSITES_TABLE,
    Item: data,
  };

  // Create a PutCommand instance
  const command = new PutCommand(params);

  // Use .then() and .catch() for handling promise resolution and rejection
  return dynamoDb
    .send(command)
    .then(() => resp200(data))
    .catch((error) => resp500({ message: "Failed to save data", error }));
};
