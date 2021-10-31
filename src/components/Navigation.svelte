<script>
    import { onMount } from "svelte";
    import { Link } from "svelte-routing";
    import { Authentication } from "../clients/Authentication";

    export let isSignedIn = false;

    onMount(async () => {
        isSignedIn = await Authentication.isSignedIn();
    });
</script>

<nav class="header">
    <div class="pure-menu pure-menu-horizontal">
        <Link class="pure-menu-heading" to="/">Loft 🕊</Link>
        <ul class="pure-menu-list">
            {#if isSignedIn === true}
            <li class="pure-menu-item"><Link class="pure-menu-link" to="/">Dashboard</Link></li>
            <li class="pure-menu-item"><Link class="pure-menu-link" to="/settings">Settings</Link></li>
            <li class="pure-menu-item"><Link class="pure-menu-link" to="/logout">Logout</Link></li>
            {:else}
            <li class="pure-menu-item"><Link class="pure-menu-link" to="/login">Login</Link></li>
            {/if}
        </ul>
    </div>
</nav>

<style>
    nav {
        background-color: azure;
    }
</style>