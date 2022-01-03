import { ICredentials } from "@aws-amplify/core";
import { DescribeTableCommand, DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, ScanCommand, QueryCommand } from "@aws-sdk/lib-dynamodb";
import { Message } from "../models/Message";

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
        const command = new DescribeTableCommand({ TableName: this.tableName });
        const tableInfo = await this.dynamoDbClient.send(command);
        return tableInfo.Table || null;
    }

    public async tableItems(...properties: string[]) {
        properties = properties.length > 0 ? properties : [
            "id",
            "destination",
            "destinationName",
            "source",
            "sourceName",
            "subject",
            "sent",
            "timestamp",
            "metadata.BucketName",
            "metadata.ObjectKey"
        ];

        const { projection, attributeNames } = this.filterReservedKeywords(properties);

        const command = new ScanCommand({
            TableName: this.tableName,
            ProjectionExpression: projection.join(','),
            ExpressionAttributeNames: Object.keys(attributeNames).length !== 0 ? attributeNames : undefined // some are reserved keywords
        });
        const result = await this.documentClient.send(command);
        return result.Items;
    }

    private filterReservedKeywords(properties: string[]): { projection: string[], attributeNames: {[key: string]: string} } {
        const reservedKeywords = new Set([
            "source",
            "timestamp"
        ]);

        const projection: string[] = [];
        const attributeNames: { [key: string]: string; } = {};
        
        properties.forEach(prop => { 
            if(reservedKeywords.has(prop)) {
                const escapedName = "#" + prop;
                projection.push(escapedName);
                attributeNames[escapedName] = prop;
            } else {
                projection.push(prop);
            }
        });

        return { projection, attributeNames };
    }

    public async distinctTableItemValues(property: string, caseSensitive: boolean = true) {
        if(!property) throw new Error("Table property required for distinct query");
        const items = await this.tableItems(property);
        
        const unique = new Set<string>();
        items.forEach(item => {
            const propertyValue = caseSensitive === true ? item[property] : item[property].toLowerCase();
            unique.add(propertyValue);
        });

        return Array.from(unique);
    }

    public async get(id: string): Promise<Message> {
        const command = new QueryCommand({
            TableName: this.tableName,
            //IndexName: "id",
            KeyConditionExpression: "#id = :id",
            ExpressionAttributeNames: {
                "#id": "id"
            },
            ExpressionAttributeValues: {
                ":id": id
            },
        });
        const result = await this.documentClient.send(command);
        return result.Items[0] as Message;
    }
}