import { Duration, Stack } from "aws-cdk-lib";
import { Runtime } from "aws-cdk-lib/aws-lambda";
import {
  NodejsFunction,
  NodejsFunctionProps,
} from "aws-cdk-lib/aws-lambda-nodejs";
import { RetentionDays } from "aws-cdk-lib/aws-logs";
import { resolve } from "path";
import { AWS_REGION } from "../config";

export const LAMBDAS_PATH = resolve(__dirname, "../lambdas");
export const resolveLambda = (lambdaFile: string, cwd = LAMBDAS_PATH) =>
  resolve(cwd, lambdaFile);

export const createLambda = (
  stack: Stack,
  lambdaPath: string,
  lambdaProps: NodejsFunctionProps = {},
  { id, cwd }: { id?: string; cwd?: string } = {}
) => {
  const folders = lambdaPath.split("/");
  const handlerFunctionName = folders[folders.length - 1].replace(/.ts$/, "");
  const lambda = new NodejsFunction(stack, id || handlerFunctionName, {
    runtime: Runtime.NODEJS_LATEST,
    handler: handlerFunctionName,
    timeout: Duration.seconds(25),
    entry: resolveLambda(lambdaPath, cwd),
    logRetention: RetentionDays.ONE_DAY,
    ...lambdaProps,
    environment: {
      ...(lambdaProps.environment || {}),
    },
    bundling: {
      sourceMap: true,
      sourcesContent: true,
      keepNames: true,
    },
  });

  return lambda;
};
