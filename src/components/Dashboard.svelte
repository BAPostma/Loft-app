<script>
    import QueueDepth from "./metrics/QueueDepth.svelte";
    import DatabaseInformation from "./metrics/DatabaseInformation.svelte";
    import Messages from "./Messages.svelte";
</script>

<div class="statistics">
    <fieldset class="queues">
        <legend>Queue status</legend>
        <QueueDepth queueType="inbox" />
        <QueueDepth queueType="dlq" />
    </fieldset>

    <fieldset class="database">
        <legend>Email</legend>
        <DatabaseInformation />
    </fieldset>
</div>

<Messages />

<style>
    div.statistics {
        display: flex;
        flex-direction: row;
    }

    fieldset {
        flex-grow: 1;
    }
</style>