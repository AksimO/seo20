import { Stack } from "aws-cdk-lib";
import { RestApi } from "aws-cdk-lib/aws-apigateway";
import { name } from "../config";

export const createGateway = (stack: Stack) => {
  const api = new RestApi(stack, name("ApiGateway"), {
    restApiName: name("Seo apigateway"),
    description: "Yep",
  });
  return api;
};
