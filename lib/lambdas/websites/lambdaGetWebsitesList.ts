import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, ScanCommand } from "@aws-sdk/lib-dynamodb";
import { resp200, resp500 } from "../../utils/lambdaUtils";

// Initialize the DynamoDB Client
const client = new DynamoDBClient({ region: process.env.AWS_REGION });
const dynamoDb = DynamoDBDocumentClient.from(client);

const WEBSITES_TABLE = process.env.WEBSITES_TABLE;

// Lambda handler function with proper typing
export const lambdaGetWebsitesList = (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  // Parameters for the DynamoDB scan operation
  const params = {
    TableName: WEBSITES_TABLE,
    // Optionally, specify attributes to retrieve, e.g., ['Name', 'URL']
    // ProjectionExpression: 'Name, URL',
  };

  // Create a ScanCommand instance
  const command = new ScanCommand(params);

  // Use .then() and .catch() for handling promise resolution and rejection
  return dynamoDb
    .send(command)
    .then((result) => resp200(result.Items || []))
    .catch((error) => resp500({ message: "Cannot" }));
};
