import { ICredentials } from "@aws-amplify/core";
import { DescribeTableCommand, DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, ScanCommand } from "@aws-sdk/lib-dynamodb";

export class Database {
    private dynamoDbClient: DynamoDBClient;
    private documentClient: DynamoDBDocumentClient;
    readonly tableName: string;
    readonly region: string;

    public constructor(credentials: ICredentials, tableName: string, region: string = "eu-west-1") {
        this.dynamoDbClient = new DynamoDBClient({
            credentials: credentials,
            region: region
        });
        
        this.tableName = tableName;
        this.region = region;

        this.documentClient = DynamoDBDocumentClient.from(this.dynamoDbClient);
    }

    public async tableInformation() {
        const command = new DescribeTableCommand({ TableName: this.tableName });
        const tableInfo = await this.dynamoDbClient.send(command);
        return tableInfo.Table || null;
    }

    public async tableItems() {
        const command = new ScanCommand({
            TableName: this.tableName,
            ProjectionExpression: [
                "id",
                "destination",
                "destinationName",
                "#source",
                "sourceName",
                "subject",
                "sent",
                "#timestamp",
                "metadata.BucketName",
                "metadata.ObjectKey"
            ].join(','),
            ExpressionAttributeNames: { // some are reserved keywords
                "#source": "source",
                "#timestamp": "timestamp",
            }
        });
        const result = await this.documentClient.send(command);
        return result.Items;
    }
}