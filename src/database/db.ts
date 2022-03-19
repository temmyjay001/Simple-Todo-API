import AWS from 'aws-sdk';
import { DocumentClient } from 'aws-sdk/clients/dynamodb';

const createDynamoDBClient = (): DocumentClient => {
    if(process.env.IS_OFFLINE) {
        return new AWS.DynamoDB.DocumentClient({
          region: "localhost",
          endpoint: "http://localhost:5200",
        });
    }

    return new AWS.DynamoDB.DocumentClient();
}

export default createDynamoDBClient;