<script>
    import { createEventDispatcher } from 'svelte';
    import { Authentication } from "../clients/Authentication";

	const dispatch = createEventDispatcher();

    let username = "";
    let password = "";
    let error = "";

    const loginEventHandler = async (e) => {
        e.preventDefault();
        e.target.reset();
        
        let result = await Authentication.signIn(username, password);
        if(result !== true) {
            error = result;
        } else {
            error = ""
            dispatch("signIn");
        }
    }
</script>

<form class="pure-form pure-form-aligned" on:submit={loginEventHandler}>
    <fieldset>
        <legend>Login to Loft</legend>
        
        <div class="pure-control-group">
            <label for="username">Username</label>
            <input type="text" id="username" bind:value={username} required />
        </div>
        
        <div class="pure-control-group">
            <label for="password">Password</label>
            <input type="password" id="password" bind:value={password} required />
        </div>
        
        <div class="pure-controls">
            <button type="submit" class="pure-button pure-button-primary">Login</button>
            {#if error.length > 0}
                <span class="pure-form-message">{error}</span>
            {/if}
        </div>
    </fieldset>
</form>