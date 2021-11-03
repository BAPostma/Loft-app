<script>
    import QueueDepth from "./metrics/QueueDepth.svelte";
</script>

<fieldset>
    <legend>Queue status</legend>
    <QueueDepth queueType="inbox" />
    <QueueDepth queueType="dlq" />
</fieldset>