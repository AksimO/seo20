import { APIGatewayEvent } from "aws-lambda";
import { resp200 } from "../../utils/lambdautils";

export const lambdaGetWebsitesList = (event: APIGatewayEvent) => {
  return resp200({ message: "ok" });
};
