import { APIGatewayEvent } from "aws-lambda";
import { resp200 } from "../../utils/lambdautils";

export const lambdaAddWebsite = (event: APIGatewayEvent) => {
  return resp200({ message: "Ok" });
};
