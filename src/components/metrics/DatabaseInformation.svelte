<script>
    import { onMount } from "svelte";
    import { Authentication } from "../../clients/Authentication";
    import { BrowserStorage } from "../../clients/BrowserStorage";
    import { Database } from "../../clients/Database";

    let messageCount;
    let tableSize;
    let error;

    onMount(async () => {
        try {
            const creds = await Authentication.AwsCredentials();
            const settings = BrowserStorage.getSettings();
            const database = new Database(creds, settings.tableName, settings.region);
            const info = await database.tableInformation();
            messageCount = info.ItemCount;
            tableSize = info.TableSizeBytes;
        } catch(err) {
            error = `Failed to load table information.`;
        }
    });
</script>

<div class="database">
    {#if messageCount !== undefined}
    <div class="items" title="Database size: {tableSize} bytes">
        <span class="count">{messageCount}</span>
        <span class="suffix">messages processed</span>
    </div>
    {:else if error !== undefined}
    <p class="error">{error}</p>
    {:else}
    <span class="skeleton-box"></span>
    {/if}
</div>

<style>
    div.database {
        display: block;
    }

    div.items {
        text-align: center;
    }

    div.items > span.count {
        font-size: x-large;
        display: block;
    }

    div.items > span.suffix {
        font-size: smaller;
        display: inline-block;
    }

    p.error {
        color: red;
    }
</style>