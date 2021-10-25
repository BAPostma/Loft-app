import { TableDescription } from "@aws-sdk/client-dynamodb";
import Database from "../clients/Database";
import { LoftQueueType, Queueing } from "../clients/Queueing";

export class Stats {
    private database: Database;
    private queueing: Queueing;
    private tableInfoCache: TableDescription;

    public constructor(database: Database, queueing: Queueing) {
        this.database = database;
        this.queueing = queueing;
    }

    public async emailsReceived() {
        if(this.tableInfoCache == null) {
            this.tableInfoCache = await this.database.tableInformation();
        }

        return this.tableInfoCache.ItemCount;
    }

    public async queueDepths() {
        const inboxQueueCount = await this.queueing.queueDepth(LoftQueueType.Inbox);
        const deadLetterQueueCount = await this.queueing.queueDepth(LoftQueueType.DeadLetterQueue);
        return {
            "inbox": inboxQueueCount,
            "dlq": deadLetterQueueCount
        }
    }
}