import { RemovalPolicy, Stack } from "aws-cdk-lib";
import { AttributeType, Table } from "aws-cdk-lib/aws-dynamodb";
import { name } from "../config";

export const createWebsiteMetaTable = (stack: Stack) => {
  const websitesTable = new Table(stack, name("WebsitesMetaTable"), {
    partitionKey: { name: "id", type: AttributeType.STRING },
    tableName: name("Websites"),
    removalPolicy: RemovalPolicy.DESTROY,
  });
  return websitesTable;
};
