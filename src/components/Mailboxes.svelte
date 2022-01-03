<script>
    import { onMount } from "svelte";
    import { Authentication } from "../clients/Authentication";
    import { BrowserStorage } from "../clients/BrowserStorage";
    import { Database } from "../clients/Database";
    import * as _ from "lodash";

    let mailboxes = [];
    let error;
    let filter = "";
    
    $: displayedMailboxes = _.filter(mailboxes, (name) => _.includes(name, filter.toLowerCase()));

    onMount(async () => {
        try {
            const creds = await Authentication.AwsCredentials();
            const settings = BrowserStorage.getSettings();
            const database = new Database(creds, settings.tableName, settings.region);
            const items = await database.distinctTableItemValues("destination", false);
            mailboxes = items.sort();
        } catch(err) {
            error = `Failed to load mailboxes.`;
        }
    });

    const copyMailboxEventHandler = async (mailbox) => {
        await navigator.clipboard.writeText(mailbox);
    }
</script>

<div class="filter">
    <form class="pure-form pure-form-stacked" on:submit|preventDefault={() => { /* just prevent submit */}}>
        <input type="text" class="pure-input-1" placeholder="filter mailboxes" bind:value={filter} />
        <span class="counter">{displayedMailboxes.length} items</span>
    </form>
</div>

<div class="properties">
    {#each displayedMailboxes as mailbox, idx}
        <div class="property" tabindex={idx} on:click={() => copyMailboxEventHandler(mailbox)}>
            <strong>Mailbox</strong>
            <div>{mailbox}</div>
        </div>
    {/each}
</div>

<style>
    div.filter {
        padding: 0.3rem;
    }

    span.counter {
        margin: auto 1rem;
        color: grey;
        float: right;
    }

    div.property:focus {
        background-color: aliceblue;
    }
</style>