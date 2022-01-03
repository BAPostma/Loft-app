<script>
    import { onMount } from "svelte";
    import { Authentication } from "../../clients/Authentication";
    import { BrowserStorage } from "../../clients/BrowserStorage";
    import { Database } from "../../clients/Database";

    export let id;
    let message = {};

    onMount(async () => {
        const creds = await Authentication.AwsCredentials();
        const settings = BrowserStorage.getSettings();
        const database = new Database(
            creds,
            settings.tableName,
            settings.region
        );

        message = await database.get(id);
        console.log(message);
    });
</script>


<nav class="path">
    <span>loft</span>
    <span>{message.destination}</span>
</nav>

<div class="properties">
    <div class="property">
        <strong>Subject</strong>
        <div>{message.subject}</div>
    </div>

    <div class="property">
        <strong>Sent</strong>
        <div>{message.sent}</div>
    </div>
    <div class="property">
        <strong>From</strong>
        <div title={message.source}>{message.sourceName}</div>
    </div>
    <div class="property">
        <strong>To</strong>
        <div title={message.destination}>{message.destinationName}</div>
    </div>
</div>


<style lang="scss">
    nav.path {
        margin: 0.3rem;
    }

    nav.path span:first-child {
        color: #ccc;
    }

    nav.path span:first-child::after {
        content: " / ";
        color: black;
    }
</style>
