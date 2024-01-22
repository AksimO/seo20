import * as cdk from "aws-cdk-lib";
import { Construct } from "constructs";
import { createWebsiteMetaTable } from "./db/websitesMetaTable";
import { createSitemapTable } from "./db/sitemapTable";
import { createGateway } from "./gateway/gateway";
import { createWebsitesLambdas } from "./lambdas/websites/createWebsitesLambdas";
// import * as sqs from 'aws-cdk-lib/aws-sqs';

export class PortalStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const websitesTable = createWebsiteMetaTable(this);
    const sitemapTable = createSitemapTable(this);
    const gw = createGateway(this);
    const websites = createWebsitesLambdas(this, {
      websitesTable,
      gw,
    });
    // The code that defines your stack goes here

    // example resource
    // const queue = new sqs.Queue(this, 'PortalQueue', {
    //   visibilityTimeout: cdk.Duration.seconds(300)
    // });
  }
}
