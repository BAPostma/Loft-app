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

    div.properties {
        margin-top: 1rem;
    }

    div.property {
        display: flex;
        flex-direction: column;
        min-height: 3.6rem;
        
        padding: 0.3rem;
        word-break: break-word;

        border-bottom-style: solid;
        border-width: 2px;
        border-color: azure;
    }

    div.property:first-child {
        border-top-style: solid;
    }

    div.property strong {
        font-size: x-small;
        display: block;
        padding-top: 0.3rem;
        padding-bottom: 0.3rem;
    }

    div.property div {
        display: block;
    }
</style>
