<script>
    import { onMount } from "svelte";
    import { Authentication } from "../../clients/Authentication";
    import { BrowserStorage } from "../../clients/BrowserStorage";
    import { Queueing, LoftQueueType } from "../../clients/Queueing";

    export let queueType = LoftQueueType.Inbox;
    let queueDepth;
    let error;

    onMount(async () => {
        try {
            const creds = await Authentication.AwsCredentials();
            const settings = BrowserStorage.getSettings();
            const queueing = new Queueing(creds, settings.queuePrefix, settings.region);
            queueDepth = await queueing.queueDepth(queueType);
        } catch(err) {
            error = `Failed to load queue depth for ${queueType}.`;
        }
    });
</script>

<div class="queue">
    {#if queueDepth !== undefined}
    <span class="name">{queueType}</span>
    <span class="depth">{queueDepth} messages</span>
    {:else if error !== undefined}
    <p class="error">{error}</p>
    {:else}
    <span class="skeleton-box"></span>
    {/if}
</div>

<style>
    div.queue {
        display: grid;
        grid-template-columns: 1fr 1fr;
        padding: 0.1rem;
    }
        div.queue:hover {
            background-color: lightblue;
        }

    span.name {
        text-transform: uppercase;
    }

    span.skeleton-box {
        grid-column: 1 / 3;
    }

    p.error {
        color: red;
    }
</style>