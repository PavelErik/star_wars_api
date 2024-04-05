import * as AWS from "aws-sdk";
import { DocumentClient } from "aws-sdk/clients/dynamodb";

const dynamoDBClient = (): DocumentClient => {
  if (process.env.IS_OFFLINE) {
    return new AWS.DynamoDB.DocumentClient({
      region: "us-east-2",
      endpoint: "http://localhost:8000",
      accessKeyId: "fakeMyKeyId",
      secretAccessKey: "fakeSecretAccessKey",
      convertEmptyValues: true,
    });
  }

  return new AWS.DynamoDB.DocumentClient();
};

export default dynamoDBClient;
