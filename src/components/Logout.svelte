<script>
    import { createEventDispatcher, onMount } from 'svelte';
    import { Authentication } from "../clients/Authentication";

	const dispatch = createEventDispatcher();
    let username;
    let expiration;

    const logoutEventHandler = async (e) => {
        e.preventDefault();
        await Authentication.signOut();
        dispatch("signOut");
    }

    onMount(async () => {
        const userInfo = await Authentication.userInformation();
        const credentials = await Authentication.AwsCredentials();
        username = userInfo.username;
        expiration = credentials.expiration;
    });
</script>

<form on:submit={logoutEventHandler}>
    {#if username && expiration}
    <span id="username">You're signed in as {username} until {expiration?.toUTCString()}.</span>
    {:else}
    <span class="skeleton-box"></span>
    {/if}
    <button type="submit" class="pure-button pure-button-primary">Logout</button>
</form>

<style>
    form > * {
        display: block;
        margin-bottom: 1rem;
    }
</style>