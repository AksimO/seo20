import { Stack } from "aws-cdk-lib";
import { createLambda } from "../../utils/createLamba";
import { Table } from "aws-cdk-lib/aws-dynamodb";
import { LambdaIntegration, RestApi } from "aws-cdk-lib/aws-apigateway";

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
  websitesResource.addMethod("GET", new LambdaIntegration(listLambda));
  websitesResource.addMethod("POST", new LambdaIntegration(addLambda));
  return {
    addLambda,
    listLambda,
  };
};
