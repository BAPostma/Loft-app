<script>
    import { navigate } from "svelte-routing";
    import { BrowserStorage } from "../clients/BrowserStorage";
    import * as aws from "../Cloud";

    const settings = BrowserStorage.getSettings();
    let simpleSetup = {
        active: true,
        domain: settings.instanceName ? settings.instanceName.replace("_", ".") : ""
    }

    $: {
        settings.instanceName = simpleSetup.domain.replace(".", "_");
        settings.tableName = `loft-${settings.instanceName}`;
        settings.queuePrefix = `sqs-${settings.instanceName}`;
    }

    const toggleAdvanced = () => {
        simpleSetup.active = !simpleSetup.active;
    }

    const saveEventHandler = (e) => {
        e.preventDefault();
        BrowserStorage.saveSettings(settings);
        aws.ConfigureSDK();
    }

    const shareEventHandler = (e) => {
        navigate("settings/share");
    }
    </script>

{#if simpleSetup.active}
<form class="pure-form pure-form-stacked">
    <fieldset id="simple">
        <legend>Basic setup</legend>
        
        <h4 class="form-header">Essentials</h4>

        <label for="domain">Domain name</label>
        <input type="text" class="pure-input-1" id="domain" placeholder="e.g. mydomain.com" bind:value={simpleSetup.domain} />
    
        <label for="region">AWS region</label>
        <input type="text" class="pure-input-1" id="region" pattern="^[a-zA-Z]+-[a-zA-Z]+-[0-9a-z]+$" placeholder="e.g. aq-central-9" autocomplete="off" bind:value={settings.region}  />
    
        <h4 class="form-header">AWS Cognito</h4>

        <label for="identityPoolId">Identity pool id</label>
        <input type="text" class="pure-input-1" id="identityPoolId" placeholder="e.g. {settings.region || 'aq-central-9'}:a0b1c2..." autocomplete="off" bind:value={settings.identityPoolId} />
    
        <label for="userPoolId">User pool id</label>
        <input type="text" class="pure-input-1" id="userPoolId" placeholder="e.g. {settings.region || 'aq-central-9'}_0a1b2c..." autocomplete="off" bind:value={settings.userPoolId} />
    
        <label for="userPoolWebClientId">User pool web client id</label>
        <input type="text" class="pure-input-1" id="userPoolWebClientId" placeholder="e.g. 0foo1bar2baz345..." autocomplete="off" bind:value={settings.userPoolWebClientId} />
    
        <button type="submit" class="pure-button pure-button-primary" on:click={saveEventHandler}>Save</button>
        <button type="button" class="pure-button button-small" on:click={toggleAdvanced}>Advanced</button>
        <button type="button" class="pure-button button-small" on:click={shareEventHandler}>Share...</button>
    </fieldset>
</form>
{:else}
<form class="pure-form pure-form-aligned">
    <fieldset id="advanced">
        <legend>Advanced settings</legend>
    
        <div class="pure-control-group">
            <label for="instance">Loft instance name</label>
            <input type="text" id="instance" placeholder="e.g. mydomain_com" bind:value={settings.instanceName} />
        </div>
        
        <div class="pure-control-group">
            <label for="region">AWS region</label>
            <input type="text" id="region" placeholder="e.g. aq-central-9" bind:value={settings.region} />
        </div>
        
        <div class="pure-control-group">
            <label for="tableName">DynamoDB table name</label>
            <input type="text" id="tableName" placeholder="e.g. loft-mydomain_com" bind:value={settings.tableName} />
        </div>
        
        <div class="pure-control-group">
            <label for="queuePrefix">SQS queue prefix</label>
            <input type="text" id="queuePrefix" placeholder="e.g. loft-mydomain_com" bind:value={settings.queuePrefix} />
        </div>
        
        <div class="pure-control-group">
            <label for="identityPoolId">Cognito identity pool id</label>
            <input type="text" id="identityPoolId" placeholder="e.g. aq-central-9:a0b1c2..." bind:value={settings.identityPoolId} />
        </div>
        
        <div class="pure-control-group">
            <label for="userPoolId">Cognito user pool id</label>
            <input type="text" id="userPoolId" placeholder="e.g. aq-central-9_0a1b2c..." bind:value={settings.userPoolId} />
        </div>
        
        <div class="pure-control-group">
            <label for="userPoolWebClientId">Cognito user pool web client id</label>
            <input type="text" id="userPoolWebClientId" placeholder="e.g. 0foo1bar2baz345..." bind:value={settings.userPoolWebClientId} />
        </div>
        <button type="submit" class="pure-button pure-button-primary" on:click={saveEventHandler}>Save</button>
        <button type="button" class="pure-button button-small" on:click={toggleAdvanced}>Simple</button>
        <button type="button" class="pure-button button-small" on:click={shareEventHandler}>Share...</button>
    </fieldset>
</form>
{/if}

<style>
    input[type="text"] {
        text-transform: lowercase;
    }

    fieldset {
        padding-left: 0.3em;
        padding-right: 0.3em;
    }

    .form-header {
        color: gray;
        margin: 0.75em auto;
    }

    button.button-small {
        font-size: 75%;
    }
</style>