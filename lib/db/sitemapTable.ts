import { AttributeType, Table } from "aws-cdk-lib/aws-dynamodb";
import { name } from "../config";
import { RemovalPolicy, Stack } from "aws-cdk-lib";

export const createSitemapTable = (stack: Stack) => {
  return new Table(stack, name("sitemapTable"), {
    partitionKey: { name: "pageId", type: AttributeType.STRING },
    sortKey: { name: "websiteId", type: AttributeType.STRING },
    tableName: "PageDetails",
    removalPolicy: RemovalPolicy.DESTROY,
  });
};
