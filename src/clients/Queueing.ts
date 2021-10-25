import { ICredentials } from "@aws-amplify/core";
import { GetQueueAttributesCommand, ListQueuesCommand, SQSClient } from "@aws-sdk/client-sqs";

export class Queueing {
    private client: SQSClient;
    private queueUrlCache: string[] = [];
    readonly queueNamePrefix: string;

    public constructor(credentials: ICredentials, queueprefix: string, region: string = "eu-west-1") {
        this.client = new SQSClient({
            credentials: credentials,
            region: region
        });
        this.queueNamePrefix = queueprefix;
    }

    public async queueDepth(type: LoftQueueType = LoftQueueType.Inbox) {
        const queues = await this.listQueues();
        const url = queues.find((val, idx) => val.endsWith(type));
        if(url == undefined) return Error("Queue not found");

        const command = new GetQueueAttributesCommand({
            QueueUrl: url,
            AttributeNames: [
                "ApproximateNumberOfMessages",
                "ApproximateNumberOfMessagesDelayed",
                "ApproximateNumberOfMessagesNotVisible"
            ]
        });
        const result = await this.client.send(command);
        
        let count = 0;
        command.input.AttributeNames.forEach(attr => {
            count += parseInt(result.Attributes[attr]);
        });
        
        return count;
    }

    private async listQueues() {
        if(this.queueUrlCache.length > 0) return this.queueUrlCache;

        const command = new ListQueuesCommand({ QueueNamePrefix: this.queueNamePrefix });

        const result = await this.client.send(command);
        this.queueUrlCache = result.QueueUrls ?? [];
        
        return this.queueUrlCache;
    }
}

export enum LoftQueueType {
    Inbox = "inbox",
    DeadLetterQueue = "dlq"
}