import { Stack } from "aws-cdk-lib";
import { createLambda } from "../../utils/createLamba";
import { Table } from "aws-cdk-lib/aws-dynamodb";
import { Cors, LambdaIntegration, RestApi } from "aws-cdk-lib/aws-apigateway";

export const createWebsitesLambdas = (
  stack: Stack,
  props: { websitesTable: Table; gw: RestApi }
) => {
  const websitesTable = props.websitesTable;
  const gw = props.gw;
  const addLambda = createLambda(stack, "websites/lambdaAddWebsite.ts", {
    environment: {
      WEBSITES_TABLE: websitesTable.tableName,
    },
  });

  const listLambda = createLambda(stack, "websites/lambdaGetWebsitesList.ts", {
    environment: {
      WEBSITES_TABLE: websitesTable.tableName,
    },
  });
  websitesTable.grantReadData(listLambda);
  websitesTable.grantWriteData(addLambda);

  const websitesResource = gw.root.addResource("websites");

  websitesResource.addCorsPreflight({
    allowOrigins: Cors.ALL_ORIGINS, // Use specific origins if you want to restrict access
    allowMethods: Cors.ALL_METHODS, // Adjust according to your needs
    allowHeaders: ["Content-Type", "X-Amz-Date", "Authorization", "X-Api-Key"], // Specify allowed headers
  });
  websitesResource.addMethod("GET", new LambdaIntegration(listLambda));
  websitesResource.addMethod("POST", new LambdaIntegration(addLambda));
  return {
    addLambda,
    listLambda,
  };
};
